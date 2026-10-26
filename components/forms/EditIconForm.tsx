'use client';

import { comboKey, ICON_TEMPLATE, IconId } from '@/lib/icons';
import ActionButton from '../ui/ActionButton';
import MemberIcon from '../ui/MemberIcon';
import type { Member } from '@/db/types';
import { useMemo, useState } from 'react';
import { USER_COLORS, UserColor } from '@/lib/userColors';
import EditPopUp from '../ui/EditPopup';
import { updateMemberAction } from '@/actions/members';

interface EditIconProps {
  member: Member;
  memberCombos: {
    id: string;
    icon: IconId;
    colorChoice: UserColor;
  }[];
}

export default function EditIconForm({ member, memberCombos }: EditIconProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentIcon, setCurrentIcon] = useState(member.icon);
  const [currentColor, setCurrentColor] = useState(member.colorChoice);
  const [isError, setIsError] = useState('');

  // icon/color conflict UI logic to block taken
  const takenCombos = useMemo(
    () => new Set(memberCombos.filter((m) => m.id !== member.id).map(comboKey)),
    [memberCombos, member.id],
  );
  const disableIcon = (icon: IconId) => {
    return takenCombos.has(comboKey({ icon, colorChoice: currentColor }));
  };
  const disableColor = (colorChoice: UserColor) => {
    return takenCombos.has(comboKey({ icon: currentIcon, colorChoice }));
  };

  function handleClose() {
    setCurrentIcon(member.icon);
    setCurrentColor(member.colorChoice);
    setIsEditing(false);
  }

  async function handleSave() {
    const result = await updateMemberAction(member.groupId, member.id, {
      icon: currentIcon,
      colorChoice: currentColor,
    });

    if (!result.ok) {
      setIsError(result.error!);
      return;
    }
    setIsEditing(false);
  }

  return (
    <div>
      <button type='button' onClick={() => setIsEditing(true)}>
        <MemberIcon id={member.icon} colorChoice={member.colorChoice} />
      </button>
      {isEditing && (
        <EditPopUp onClose={handleClose} onSave={handleSave}>
          <aside className='m-4 text-center'>
            <h2 className='p-2 text-lg font-bold text-primary-soft-text'>
              Pick a Color
            </h2>
            <div className='grid grid-cols-2 md:grid-cols-6 gap-2'>
              {USER_COLORS.map((color) => {
                return (
                  <button
                    type='button'
                    key={color}
                    data-theme={color}
                    className={`w-4 h-4 rounded-md bg-primary disabled:opacity-20 ${color === currentColor ? 'ring-2 ring-accent ring-offset-2' : ''}`}
                    onClick={() => setCurrentColor(color)}
                    disabled={disableColor(color)}
                  />
                );
              })}
            </div>
          </aside>
          <div className='grid grid-cols-2 md:grid-cols-7 m-4 gap-4'>
            {ICON_TEMPLATE.map((i) => {
              return (
                <button
                  type='button'
                  key={i.id}
                  onClick={(e) => {
                    setCurrentIcon(i.id);
                  }}
                  className={`disabled:opacity-20
                    ${
                      i.id === currentIcon
                        ? 'ring-accent ring-3 ring-offset-2 rounded-full'
                        : ''
                    }
                  `}
                  disabled={disableIcon(i.id)}
                >
                  <MemberIcon id={i.id} colorChoice={currentColor} />
                </button>
              );
            })}
          </div>
        </EditPopUp>
      )}
    </div>
  );
}
