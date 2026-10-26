import EditIconForm from '@/components/forms/EditIconForm';
import EditMemberNameForm from '@/components/forms/EditMemberNameForm';
import { getGroupMemberIconCombos, getMemberById } from '@/db/queries/members';

export default async function GroupMemberPage({
  params,
}: {
  params: Promise<{ memberId: string; groupId: string }>;
}) {
  const { memberId, groupId } = await params;

  const [member, memberCombos] = await Promise.all([
    getMemberById(memberId),
    getGroupMemberIconCombos(groupId),
  ]);

  return (
    <div className=''>
      <div className='relative flex bg-primary-soft p-4 justify-start gap-4 items-center cursor-pointer'>
        <EditIconForm member={member} memberCombos={memberCombos} />
        <EditMemberNameForm
          memberId={member.id}
          groupId={member.groupId}
          currentName={member.name}
        />
      </div>
    </div>
  );
}
