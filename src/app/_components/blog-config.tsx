'use client';

import { useEffect } from 'react';
import { useConfig } from '@/lib/useConfig';

export function BlogConfig() {
  const config = useConfig();

  useEffect(() => {
    if (!config) return;

    const root = document.documentElement;
    root.style.setProperty('--blog-bg', config.colors.background);
    root.style.setProperty('--blog-text', config.colors.text);
    root.style.setProperty('--blog-accent', config.colors.accent);

    if (config.fonts.googleFontsUrl) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = config.fonts.googleFontsUrl;
      document.head.appendChild(link);
    }
  }, [config]);

  return null;
}
