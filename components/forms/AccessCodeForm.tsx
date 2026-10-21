'use client';

import { enterGroupAction } from '@/actions/groups';
import ActionButton from '../ui/ActionButton';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function GroupCodeInput() {
  const router = useRouter();
  const [groupCode, setGroupCode] = useState('');
  const [codeMessage, setCodeMessage] = useState<string>();

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    try {
      const isValidGroup = await enterGroupAction(groupCode);

      if (!isValidGroup) {
        setCodeMessage('Invalid group code. Please try again.');
        return;
      }

      router.push(`/gift-group/${groupCode}`);
    } catch (error) {
      console.error('Error checking group code:', error);
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col xl:flex-row p-8 rounded-md gap-2 m-4 items-center bg-primary text-primary-foreground'
      >
        <label htmlFor='groupCode'>Enter Group Code</label>
        <div>
          <input
            type='text'
            id='groupCode'
            placeholder='Enter Group Code'
            value={groupCode}
            onChange={(e) => setGroupCode(e.target.value)}
            className='rounded-md border border-primary px-3 py-2 bg-primary-soft text-primary-soft-text focus:outline-none focus:ring-2 focus:ring-accent'
          />
          {codeMessage && <p className='absolute'>{codeMessage}</p>}
        </div>
        <ActionButton name='Join Group' type='submit' />
      </form>
    </div>
  );
}
