'use client';

import { createGroup } from '@/actions/groups';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ActionButton from '../ui/ActionButton';

export default function CreateGroupForm() {
  const router = useRouter();
  const [codeMessage, setCodeMessage] = useState<string>();
  const [name, setName] = useState('');
  const [event, setEvent] = useState('');
  const [date, setDate] = useState('');
  const [success, setSuccess] = useState<boolean>(false);
  const [code, setCode] = useState('');

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    const newCode = await createGroup({ name, event, date });

    if (newCode.ok) {
      setCode(newCode.id);
      setSuccess(true);
      return;
    }
    setCodeMessage('Problem submitting form please try again.');
  }

  function handleClick() {
    router.push(`/gift-group/${code}`);
  }

  return (
    <div className='flex flex-col items-center'>
      {(success && (
        <div>
          <p>Group made! Welcome to Gift Tracker!</p>
          <p>
            Your Group Code: <span className='text-xl text-bold'>{code}</span>
          </p>
          <ActionButton
            name='Go to Group'
            type='button'
            onClick={handleClick}
          />
        </div>
      )) || (
        <>
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
          </form>
          {codeMessage && <p>{codeMessage}</p>}
          <ActionButton
            name='Create Group'
            type='submit'
            form='createGroupForm'
            disabled={!name || !event || !date}
          />
        </>
      )}
    </div>
  );
}
