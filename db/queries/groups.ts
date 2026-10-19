'use server';

import { db } from '@/db';
import { groups } from '@/db/schema';
import { CreateNewGroupParams } from '@/db/types';
import { eq } from 'drizzle-orm';
import { createNewMember } from './members';

const MAX_TRIES = 5;

export async function createNewGroup({
  name,
  event,
  date,
}: CreateNewGroupParams) {
  for (let tries = 1; tries <= MAX_TRIES; tries++) {
    const [group] = await db
      .insert(groups)
      .values({ name, event, date })
      .onConflictDoNothing({ target: groups.id })
      .returning();

    if (group) {
      await createNewMember(group.id);
      return group.id;
    }
  }
  throw new Error('Failed to create group.');
}

export async function getGroupData(groupId: string) {
  try {
    const group = await db.select().from(groups).where(eq(groups.id, groupId));

    return group;
  } catch (e) {
    console.error('Error finding group: ', e);
    throw e;
  }
}

export async function validateGroupId(inputId: string): Promise<boolean> {
  const [group] = await db
    .select({ id: groups.id })
    .from(groups)
    .where(eq(groups.id, inputId))
    .limit(1);

  return !!group;
}
