import type { Member } from '@/db/types';
import MemberIcon from './ui/MemberIcon';
import Link from 'next/link';
import DeleteButton from './ui/DeleteButton';
import { deleteMemberAction } from '@/actions/members';

export default function MemberList({ members }: { members: Member[] }) {
  return (
    <ul>
      {members.map((member) => (
        <li
          key={member.id}
          className='relative m-2 rounded-lg bg-primary text-center text-primary-foreground border-2 border-accent hover:bg-primary-hover flex flex-row gap-3 p-2 items-center p-2'
        >
          <MemberIcon id={member.icon} colorChoice={member.colorChoice} />
          <DeleteButton
            name='Member'
            deleteFunction={deleteMemberAction.bind(null, member.id)}
            size='text-sm'
          />
          <Link
            href={`/gift-group/${member.groupId}/${member.id}`}
            className="after:content-[''] after:absolute after:inset-0"
          />
          {member.name}
        </li>
      ))}
    </ul>
  );
}
