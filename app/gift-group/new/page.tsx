import CreateGroupForm from '@/components/forms/CreateGroupForm';

export default function NewGroupPage() {
  return (
    <div className='flex flex-col px-4 py-8 m-2 items-center'>
      <h1 className='text-xl font-bold mb-4'>Create New Group</h1>
      <CreateGroupForm />
    </div>
  );
}
