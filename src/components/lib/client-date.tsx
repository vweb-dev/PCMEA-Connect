// src/components/lib/client-date.tsx
"use client";

import { useState, useEffect } from 'react';

interface ClientDateProps {
  date: Date;
  options?: Intl.DateTimeFormatOptions;
}

export function ClientDate({ date, options }: ClientDateProps) {
  const [formattedDate, setFormattedDate] = useState<string | null>(null);

  useEffect(() => {
    // This code runs only on the client, after hydration
    setFormattedDate(date.toLocaleDateString(undefined, options));
  }, [date, options]);

  // Render nothing on the server and during initial client render
  // to prevent mismatch. The actual date will appear after hydration.
  return <>{formattedDate}</>;
}
