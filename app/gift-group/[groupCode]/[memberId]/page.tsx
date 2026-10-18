import { GetMemberData } from '@/actions/members';

export default async function GroupMemberPage({
  params,
}: {
  params: Promise<{ groupCode: string; memberId: string }>;
}) {
  const { groupCode, memberId } = await params;

  const memberData = await GetMemberData(groupCode, memberId);
  return (
    <div>
      <h1>Made it</h1>
    </div>
  );
}
