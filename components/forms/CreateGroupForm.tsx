'use client';

import { CreateNewGroup } from '@/actions/groups';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ActionButton from '../ui/ActionButton';

export default function CreateGroupForm() {
  const router = useRouter();
  const [codeMessage, setCodeMessage] = useState<string>();
  const [name, setName] = useState('');
  const [event, setEvent] = useState('');
  const [date, setDate] = useState('');

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    try {
      const newCode = await CreateNewGroup({ name, event, date });
      // change to db 200 or error?
      if (!newCode) {
        setCodeMessage('Problem submitting form please try again.');
        return;
      }

      router.push(`/gift-group/${newCode}`);
    } catch (error) {
      console.error('Group form submission error:', error);
      setCodeMessage('Something went wrong. Please try again.');
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <form
        id='createGroupForm'
        onSubmit={handleSubmit}
        className='flex flex-col gap-2 items-center pb-4'
      >
        <label htmlFor='name'>Group Name: </label>
        <input
          type='text'
          id='name'
          placeholder='What will you call the group...'
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={50}
          className='bg-primary-soft p-2 rounded-md'
        />
        <label htmlFor='event'>Event Name: </label>
        <input
          type='text'
          id='event'
          placeholder='Birthday, Christmas, Hanukkah, etc...'
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          maxLength={25}
          className='bg-primary-soft p-2 rounded-md'
        />
        <label htmlFor='date'>Date of Event: </label>
        <input
          type='date'
          id='date'
          min={new Date().toLocaleDateString('en-CA')}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className='bg-primary-soft p-2 rounded-md'
        />
        {codeMessage && <p>{codeMessage}</p>}
      </form>
      <ActionButton
        name='Create Group'
        type='submit'
        form='createGroupForm'
        disabled={!name || !event || !date}
      />
    </div>
  );
}
