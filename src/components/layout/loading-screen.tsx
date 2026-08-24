// src/components/layout/loading-screen.tsx
import { Logo } from "@/components/icons/logo";

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-bounce">
            <Logo width={80} height={80} />
        </div>
        <div className="text-lg font-semibold text-primary">
            PCMEA Connect
        </div>
      </div>
    </div>
  );
}
