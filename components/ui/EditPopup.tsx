import { ReactNode } from 'react';
import ActionButton from './ActionButton';

interface EditPopupProps {
  onClose: () => void;
  children: ReactNode;
  onSave: () => void;
}

export default function EditPopUp({
  onClose,
  children,
  onSave,
}: EditPopupProps) {
  return (
    <div className='absolute flex justify-around items-center bg-primary-soft border-2 border-accent rounded-md m-2'>
      <div
        className='absolute top-0 right-0 text-primary-soft-text font-extrabold text-lg cursor-pointer hover:bg-accent/50 hover:text-accent-forground rounded-md p-2'
        onClick={onClose}
      >
        X
      </div>
      {children}
      <div className='flex flex-col gap-2 m-2'>
        <ActionButton name='Save' type='button' onClick={onSave} />
      </div>
    </div>
  );
}
