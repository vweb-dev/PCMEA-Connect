
"use server";

import { promises as fs } from 'fs';
import { join } from 'path';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const MAX_FILE_SIZE = 512 * 1024; // 512KB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/svg+xml", "image/x-icon", "image/vnd.microsoft.icon"];

interface FormState {
    message: string;
    error: string | null;
}

async function saveFile(file: File | undefined, fileName: string): Promise<void> {
    if (!file || file.size === 0) {
        return; // No file uploaded for this field, so we skip it.
    }

    if (file.size > MAX_FILE_SIZE) {
        throw new Error(`${file.name} is too large. Max file size is 512KB.`);
    }

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        throw new Error(`Invalid file type for ${file.name}. Please upload a valid image.`);
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const publicPath = join(process.cwd(), 'public');
    const finalPath = join(publicPath, fileName);

    // Ensure the public directory exists before writing the file
    await fs.mkdir(publicPath, { recursive: true });
    
    await fs.writeFile(finalPath, buffer);
}

function hexToHsl(hex: string): string {
    if (!hex || !hex.startsWith('#')) return '';
    hex = hex.replace(/^#/, '');
    if (hex.length !== 6) return '';
    
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);
    
    return `${h} ${s}% ${l}%`;
}


async function updateTheme(themeData: Record<string, string>) {
    const globalsCssPath = join(process.cwd(), 'src', 'app', 'globals.css');
    let cssContent = await fs.readFile(globalsCssPath, 'utf-8');

    const updateCssVar = (css: string, varName: string, value: string, isDark: boolean) => {
        if (!value) return css;
        const hslValue = hexToHsl(value);
        if (!hslValue) return css;

        const regex = isDark 
            ? new RegExp(`(\\.dark\\s*{[^{]*?--${varName}:\\s*)[^;]+(;[^{]*?})`, 's')
            : new RegExp(`(:root\\s*{[^{]*?--${varName}:\\s*)[^;]+(;[^{]*?})`, 's');

        if (regex.test(css)) {
            return css.replace(regex, `$1${hslValue}$2`);
        }
        return css;
    };

    cssContent = updateCssVar(cssContent, 'primary', themeData.lightPrimary, false);
    cssContent = updateCssVar(cssContent, 'secondary', themeData.lightSecondary, false);
    cssContent = updateCssVar(cssContent, 'accent', themeData.lightAccent, false);
    cssContent = updateCssVar(cssContent, 'card', themeData.lightCard, false);
    cssContent = updateCssVar(cssContent, 'background', themeData.lightBackground, false);
    
    // For primary changes, also update ring and chart-1
    if (themeData.lightPrimary) {
        cssContent = updateCssVar(cssContent, 'ring', themeData.lightPrimary, false);
        cssContent = updateCssVar(cssContent, 'chart-1', themeData.lightPrimary, false);
    }
     if (themeData.lightAccent) {
        cssContent = updateCssVar(cssContent, 'accent', themeData.lightAccent, false);
    } else if (themeData.lightPrimary) {
        cssContent = updateCssVar(cssContent, 'accent', themeData.lightPrimary, false);
    }

    cssContent = updateCssVar(cssContent, 'primary', themeData.darkPrimary, true);
    cssContent = updateCssVar(cssContent, 'secondary', themeData.darkSecondary, true);
    cssContent = updateCssVar(cssContent, 'accent', themeData.darkAccent, true);
    cssContent = updateCssVar(cssContent, 'card', themeData.darkCard, true);
    cssContent = updateCssVar(cssContent, 'background', themeData.darkBackground, true);

    if (themeData.darkPrimary) {
        cssContent = updateCssVar(cssContent, 'ring', themeData.darkPrimary, true);
    }
     if (themeData.darkAccent) {
        cssContent = updateCssVar(cssContent, 'accent', themeData.darkAccent, true);
    } else if (themeData.darkPrimary) {
        cssContent = updateCssVar(cssContent, 'accent', themeData.darkPrimary, true);
    }
    
    await fs.writeFile(globalsCssPath, cssContent);
}


export async function handleSettingsUpdate(prevState: FormState, formData: FormData): Promise<FormState> {
    try {
        const logoFile = formData.get('logo') as File | null;
        if (logoFile && logoFile.size > 0) await saveFile(logoFile, 'logo.png');

        const faviconFile = formData.get('favicon') as File | null;
        if (faviconFile && faviconFile.size > 0) await saveFile(faviconFile, 'favicon.ico');

        const loadingLogoFile = formData.get('loadingLogo') as File | null;
        if (loadingLogoFile && loadingLogoFile.size > 0) await saveFile(loadingLogoFile, 'logo.png');
        
        const themeData = {
            lightPrimary: formData.get('lightPrimary') as string,
            lightSecondary: formData.get('lightSecondary') as string,
            lightAccent: formData.get('lightAccent') as string,
            lightCard: formData.get('lightCard') as string,
            lightBackground: formData.get('lightBackground') as string,
            darkPrimary: formData.get('darkPrimary') as string,
            darkSecondary: formData.get('darkSecondary') as string,
            darkAccent: formData.get('darkAccent') as string,
            darkCard: formData.get('darkCard') as string,
            darkBackground: formData.get('darkBackground') as string,
        }

        await updateTheme(themeData);
        
        revalidatePath('/', 'layout');
        return { message: 'Settings saved successfully!', error: null };

    } catch (e) {
        console.error(e);
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
        return { message: 'Failed to save settings.', error: errorMessage };
    }
}

export async function handleAboutPageUpdate(prevState: any, formData: FormData): Promise<any> {
    const title = formData.get('title');
    const subtitle = formData.get('subtitle');
    const content = formData.get('content');
    const heroImage = formData.get('heroImage') as File | null;
  
    // In a real app, you would save this to a database.
    // For now, we'll just log it.
    console.log({ title, subtitle, content });
  
    try {
        if (heroImage && heroImage.size > 0) {
            await saveFile(heroImage, 'about-hero.jpg');
        }
        revalidatePath('/about');
        return { message: 'About page updated successfully!', error: null };
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
        return { message: 'Failed to save settings.', error: errorMessage };
    }
  }

