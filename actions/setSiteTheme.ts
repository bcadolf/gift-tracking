'use server';

import { safeSiteTheme } from '@/lib/siteThemes';
import { cookies } from 'next/headers';

export async function setSiteTheme(theme: string) {
  const store = await cookies();

  store.set('site-theme', safeSiteTheme(theme)!, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  });
}
