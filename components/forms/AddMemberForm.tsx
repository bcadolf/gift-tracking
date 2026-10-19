'use client';

import ActionButton from '../ui/ActionButton';
import { createAnonMember } from '@/actions/members';

export default function AddMemberForm({ groupCode }: { groupCode: string }) {
  return (
    <ActionButton
      name='Add Member'
      type='button'
      onClick={() => createAnonMember(groupCode)}
    />
  );
}
