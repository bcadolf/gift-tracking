import { db } from '@/db';
import { members } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { memAnon } from '@/lib/anonMember';

const MAX_TRIES = 5;

export async function getMemberById(memberId: string) {
  // import db query to filter group member and return
  const memberData = await db
    .select()
    .from(members)
    .where(eq(members.id, memberId));

  return memberData;
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
