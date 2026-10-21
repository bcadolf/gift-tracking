'use client';

import { useState } from 'react';
import ActionButton from './ActionButton';
import { createPortal } from 'react-dom';

interface DeleteButtonProps {
  name: string;
  deleteFunction: () => Promise<{ error?: string } | void>;
  size: 'text-lg' | 'text-md' | 'text-xl' | 'text-sm';
}

export default function DeleteButton({
  name,
  deleteFunction,
  size,
}: DeleteButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(true);
        }}
        type='button'
        className={`text-current font-extrabold ${size} cursor-pointer rounded-md hover:bg-accent hover:text-accent-foreground absolute top-0 right-0 py-1 px-2 z-50`}
        aria-label='Delete Button'
      >
        X
      </button>
      {isOpen &&
        createPortal(
          <div className='fixed top-0 left-0 w-full h-full bg-background/30 flex justify-center items-center z-1000'>
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className='rounded-md bg-background border-2 border-primary p-8 text-center text-foreground'
            >
              <p>Delete {name}?</p>
              <ActionButton name='YES' type='button' onClick={deleteFunction} />
              <ActionButton
                name='NO'
                type='button'
                onClick={() => setIsOpen(false)}
              />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
