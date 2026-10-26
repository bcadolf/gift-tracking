'use client';

import { useState } from 'react';
import EditPopUp from '../ui/EditPopup';
import { updateMemberAction } from '@/actions/members';

interface EditMemberNameProps {
  memberId: string;
  groupId: string;
  currentName: string;
}

export default function EditMemberNameForm({
  memberId,
  groupId,
  currentName,
}: EditMemberNameProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isName, setIsName] = useState(currentName);
  const [isMessage, setIsMessage] = useState('');

  function handleClose() {
    setIsName(currentName);
    setIsEditing(false);
  }

  async function handleSave() {
    const result = await updateMemberAction(groupId, memberId, {
      name: isName,
    });

    if (!result.ok) {
      setIsMessage(result.error!);
      return;
    }

    setIsEditing(false);
  }
  return (
    <div>
      <button
        type='button'
        className='cursor-pointer'
        onClick={() => setIsEditing(true)}
      >
        {currentName}
      </button>
      {isEditing && (
        <EditPopUp onClose={handleClose} onSave={handleSave}>
          <div className='flex flex-col md:flex-row gap-2 p-4 m-2 h-24 justifty-left items-center text-primary-soft-text'>
            <label htmlFor='name'>Enter Name/Nickname: </label>
            <input
              id='name'
              value={isName}
              onChange={(e) => setIsName(e.target.value)}
              className='bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent p-2 rounded-md'
            />
            {isMessage && <p>{isMessage}</p>}
          </div>
        </EditPopUp>
      )}
    </div>
  );
}
