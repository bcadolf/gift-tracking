'use client';

import { useState } from 'react';
import ActionButton from '../ui/ActionButton';

export default function AddMemberForm({ groupCode }: { groupCode: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ActionButton
        name='Add Member'
        type='button'
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        // <div className='fixed inset-0 z-50 flex '>
        <dialog
          open
          className='absolute top-1/2 left-1/2 p-8 rounded-md backdrop:bg-black/50 backdrop:backdrop-blur '
        >
          <form>
            <label htmlFor='memberName'>Name</label>
          </form>
          <ActionButton
            name='Close'
            type='button'
            onClick={() => setIsOpen(false)}
          />
        </dialog>
        // </div>
      )}
    </>
  );
}
