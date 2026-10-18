export default function Footer() {
  return (
    <footer className='text-brand-foreground p-2 relative w-full text-center'>
      <div aria-hidden className='absolute inset-0 -z-10 -scale-100 bg-brand' />
      <p>&copy;{new Date().getFullYear()} Gift Tracker. All rights reserved.</p>
    </footer>
  );
}
