export const SITE_THEMES = ['steel', 'misty', 'ribbon', 'evergreen'] as const;
export type SiteTheme = (typeof SITE_THEMES)[number];

export const safeSiteTheme = (value?: string) =>
  SITE_THEMES.includes(value as SiteTheme) && value !== 'steel'
    ? value
    : undefined;
