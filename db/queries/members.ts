import { db } from '@/db';
import { members } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { memAnon } from '@/lib/anonMember';
import { MemberPartial } from '../types';

const MAX_TRIES = 5;

export async function getMemberById(memberId: string) {
  const [member] = await db
    .select()
    .from(members)
    .where(eq(members.id, memberId))
    .limit(1);

  return member;
}

export async function createNewMember(groupId: string) {
  for (let tries = 1; tries <= MAX_TRIES; tries++) {
    const exists = await db
      .select({
        icon: members.icon,
        colorChoice: members.colorChoice,
      })
      .from(members)
      .where(eq(members.groupId, groupId));

    const [member] = await db
      .insert(members)
      .values({ ...memAnon(exists), groupId })
      .onConflictDoNothing({
        target: [members.groupId, members.icon, members.colorChoice],
      })
      .returning();

    if (member) return member;
  }
  throw new Error('Could not create member.');
}

export async function getGroupMembers(groupId: string) {
  const groupMembers = await db
    .select()
    .from(members)
    .where(eq(members.groupId, groupId));

  return groupMembers;
}

export async function getGroupMemberIconCombos(groupId: string) {
  const combos = db
    .select({
      id: members.id,
      icon: members.icon,
      colorChoice: members.colorChoice,
    })
    .from(members)
    .where(eq(members.groupId, groupId));

  return combos;
}

export async function updateMemberById(memberId: string, input: MemberPartial) {
  const [updated] = await db
    .update(members)
    .set(input)
    .where(eq(members.id, memberId))
    .returning();

  if (!updated) throw new Error('Member not found');

  return updated;
}

export async function deleteMember(memberId: string): Promise<boolean> {
  const result = await db
    .delete(members)
    .where(eq(members.id, memberId))
    .returning({ id: members.id });

  return result.length > 0;
}
