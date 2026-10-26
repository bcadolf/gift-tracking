import { deleteGroupAction, getGroupWithMembersAction } from '@/actions/groups';
import AddMemberForm from '@/components/forms/AddMemberForm';
import MemberList from '@/components/MemberList';
import DeleteButton from '@/components/ui/DeleteButton';

export default async function GiftGroupPage({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const { groupId } = await params;
  const query = await getGroupWithMembersAction(groupId);

  if (!query) {
    return <div>Difficulties finding the group.</div>;
  }

  const groupData = query.group;
  const members = query.memData;

  return (
    <div className='relative flex items-center justify-center flex-col p-4'>
      <DeleteButton
        name='Group'
        deleteFunction={deleteGroupAction.bind(null, groupId)}
        size='text-lg'
      />
      <h1 className='p-4 m-4'>
        {groupData.name} - {groupData.event}
      </h1>
      <h3>Click your name:</h3>
      <MemberList members={members} />
      <AddMemberForm groupCode={groupId} />
    </div>
  );
}
