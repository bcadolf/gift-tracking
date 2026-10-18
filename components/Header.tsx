import Link from 'next/link';
import SiteTheme from './SiteTheme';
import { cookies } from 'next/headers';
import { safeSiteTheme } from '@/lib/siteThemes';

export default async function Header() {
  const store = await cookies();
  const current = safeSiteTheme(
    store.get('site-theme')?.value ?? 'steel',
  ) as string;

  return (
    <header className='flex justify-between bg-brand text-brand-foreground p-4 sticky top-0 w-full text-center shadow-md shadow-accent z-50'>
      <Link href='/' className='pl-4 text-2xl italic font-extrabold'>
        Gift Tracker
      </Link>
      <SiteTheme current={current} />
    </header>
  );
}
