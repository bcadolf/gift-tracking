'use client';

import { setSiteTheme } from '@/actions/setSiteTheme';
import { SITE_THEMES } from '@/lib/siteThemes';
import { useTransition } from 'react';

export default function SiteTheme({ current }: { current: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      aria-label='Site Color Theme'
      defaultValue={current}
      onChange={(e) => {
        const newTheme = e.target.value;

        document.documentElement.dataset.siteTheme = newTheme;

        startTransition(() => setSiteTheme(newTheme));
      }}
    >
      {SITE_THEMES.map((t) => (
        <option key={t} value={t} aria-label={t}>
          {t}
        </option>
      ))}
    </select>
  );
}
