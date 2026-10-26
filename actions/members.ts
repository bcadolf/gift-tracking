'use server';

import {
  createNewMember,
  deleteMember,
  getMemberById,
  updateMemberById,
} from '@/db/queries/members';

import type { MemberPartial } from '@/db/types';
import { isUniqueViolation } from '@/lib/utilities';
import { revalidatePath } from 'next/cache';

export async function createAnonMember(groupId: string) {
  await createNewMember(groupId);

  revalidatePath(`/gift-group/${groupId}`);
}

export async function updateMemberAction(
  groupId: string,
  memberId: string,
  data: MemberPartial,
) {
  try {
    await updateMemberById(memberId, data);
  } catch (e) {
    if (isUniqueViolation(e))
      return { ok: false, error: 'Icon Color combination already in use.' };
    else return { ok: false, error: `Unknown Error: ${e}` };
  }
  revalidatePath(`/gift-group/${groupId}`, 'layout');
  return { ok: true };
}

export async function deleteMemberAction(memberId: string) {
  const member = await getMemberById(memberId);

  if (!member) return { error: 'Member not Found' };

  await deleteMember(member.id);

  revalidatePath(`/gift-group/${member.groupId}`);
}
