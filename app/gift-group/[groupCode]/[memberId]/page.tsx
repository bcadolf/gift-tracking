import { getMemberById } from '@/db/queries/members';

export default async function GroupMemberPage({
  params,
}: {
  params: Promise<{ memberId: string }>;
}) {
  const { memberId } = await params;

  const member = await getMemberById(memberId);

  return (
    <div>
      <h1>Made it</h1>
      {member.name}
    </div>
  );
}
