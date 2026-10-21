'use server';

import {
  createNewMember,
  deleteMember,
  getMemberById,
} from '@/db/queries/members';
import { revalidatePath } from 'next/cache';

export async function createAnonMember(groupId: string) {
  await createNewMember(groupId);

  revalidatePath(`/gift-group/${groupId}`);
}

export async function deleteMemberAction(memberId: string) {
  const member = await getMemberById(memberId);

  if (!member) return { error: 'Member not Found' };

  await deleteMember(member.id);

  revalidatePath(`/gift-group/${member.groupId}`);
}
