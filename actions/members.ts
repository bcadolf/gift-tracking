'use server';

import { createNewMember } from '@/db/queries/members';
import { revalidatePath } from 'next/cache';

export async function createAnonMember(groupId: string) {
  await createNewMember(groupId);

  revalidatePath(`/gift-group/${groupId}`);
}
