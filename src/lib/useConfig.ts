import { useState, useEffect } from 'react';

interface BlogConfig {
  title: string;
  description: string;
  logo: {
    svg: string;
    alt: string;
  };
  colors: {
    background: string;
    text: string;
    accent: string;
  };
  fonts: {
    googleFontsUrl: string;
  };
}

export function useConfig() {
  const [config, setConfig] = useState<BlogConfig | null>(null);

  useEffect(() => {
    fetch('/config.json')
      .then(res => res.json())
      .then(data => setConfig(data.blog))
      .catch(error => console.error('Erreur config:', error));
  }, []);

  return config;
}
