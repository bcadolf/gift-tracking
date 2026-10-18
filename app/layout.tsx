import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { safeSiteTheme } from '@/lib/siteThemes';
import { cookies } from 'next/headers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Gift Tracker',
  description:
    'Track your gifts as a group, avoid duplicate gifts and multiple lists and chats.',
};

export default async function RootLayout({ children }: LayoutProps<'/'>) {
  const store = await cookies();
  const siteTheme = safeSiteTheme(store.get('site-theme')?.value ?? 'steel');

  return (
    <html
      lang='en'
      data-site-theme={siteTheme}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className='min-h-dvh flex flex-col'>
        <Header />
        <main className='grow bg-background'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
