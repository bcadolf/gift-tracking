import { getGroupWithMembers } from '@/actions/groups';
import AddMemberForm from '@/components/forms/AddMemberForm';
import MemberIcon from '@/components/ui/MemberIcon';
import Link from 'next/link';

export default async function GiftGroupPage({
  params,
}: {
  params: Promise<{ groupCode: string }>;
}) {
  const { groupCode } = await params;
  const query = await getGroupWithMembers(groupCode);

  if (!query) {
    return <div>Difficulties finding the group.</div>;
  }

  const groupData = query.group;
  const members = query.memData;

  return (
    <div className='flex items-center justify-center flex-col p-4'>
      <h1 className='p-4 m-4'>
        {groupData.name} - {groupData.event}
      </h1>
      <h3>Click your name:</h3>
      <ul>
        {members.map((member) => (
          <li
            key={member.id}
            className='m-2 rounded-lg bg-white text-center border-2 hover:bg-gray-500/60'
          >
            <Link
              href={`/gift-group/${groupCode}/${member.id}`}
              className='flex flex-row gap-3 p-2 items-center p-2'
            >
              <MemberIcon id={member.icon} colorChoice={member.colorChoice} />{' '}
              {member.name}
            </Link>
          </li>
        ))}
        <AddMemberForm groupCode={groupCode} />
      </ul>
    </div>
  );
}
