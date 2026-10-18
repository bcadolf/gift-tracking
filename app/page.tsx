import AccessCodeForm from '@/components/forms/AccessCodeForm';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='mx-auto my-auto px-4 py-8 flex items-center flex-col justify-around md:flex-row gap-8'>
      <article className='max-w-2xl border border-primary bg-primary-soft text-primary-soft-text rounded-md p-4 shadow-sm shadow-accent'>
        <h2 className='text-lg font-bold text-center mb-4'>
          Welcome to the Gift Tracker!!
        </h2>
        <p className='indent-4 mb-4'>
          It&apos;s time for a holdiay and everyone is asking for gift ideas.
          The idea lists span five text groups, two email chains, a shared
          document and a random sticky-note. Aunt Susan says she might get
          something for Jimmy but Grandma Jessie says she bought the item last
          week. And your gift was spoiled because it got sent to the wrong text
          group and you saw it. It&apos;s time to reduce the confusion around
          gifts.
        </p>
        <p className='indent-4'>
          Here you can make a group, send an invite or just share the code and
          the complex part is taken care of! No signup, no login, just a simple
          way to track gifts for family and friends.
        </p>
      </article>
      <div className='flex flex-col items-center gap-8 m-4 bg-primary-soft p-4 rounded-md border border-primary shadow-sm shadow-accent'>
        <h2 className='text-xl font-bold border-3 border-dashed border-accent rounded-md p-2 text-primary-soft-text'>
          THE GROUPS ZONE
        </h2>
        <Link
          href='/gift-group/new'
          className='rounded-md bg-primary px-3 py-2 text-primary-foreground hover:bg-primary-hover border-2 border-primary-hover transition-colors hover:border-accent'
        >
          Make A New Group
        </Link>
        <AccessCodeForm />
      </div>
    </div>
  );
}
