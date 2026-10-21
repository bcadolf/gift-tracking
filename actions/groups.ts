'use server';

import {
  createNewGroup,
  deleteGroup,
  getGroupData,
  validateGroupId,
} from '@/db/queries/groups';
import { getGroupMembers } from '@/db/queries/members';
import { redirect } from 'next/navigation';

type CreateGroupResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

export async function createGroupAction(data: {
  name: string;
  event: string;
  date: string;
}): Promise<CreateGroupResult> {
  const name = data.name?.trim();
  const event = data.event?.trim();
  const date = data.date;

  if (!name || name.length > 50) {
    return { ok: false, error: 'Group name must be 1 to 50 characters.' };
  }
  if (!event || event.length > 25) {
    return { ok: false, error: 'Event name must be 1 to 25 characters.' };
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date))) {
    return { ok: false, error: 'Please enter a valid date.' };
  }

  try {
    const result = await createNewGroup(data);

    return { ok: true, id: result };
  } catch (e) {
    console.error('Problem creating group: ', e);
    return { ok: false, error: 'Error occured please try again.' };
  }
}

export async function enterGroupAction(groupCode: string) {
  const result = await validateGroupId(groupCode);
  return result;
}

export async function getGroupWithMembersAction(groupCode: string) {
  try {
    const [groupData, memData] = await Promise.all([
      getGroupData(groupCode),
      getGroupMembers(groupCode),
    ]);

    const group = groupData[0];
    if (!group) {
      return null;
    }

    return { group, memData };
  } catch (e) {
    console.error('Error: ', e);
  }
}

export async function deleteGroupAction(groupCode: string) {
  const valid = await validateGroupId(groupCode);

  if (!valid) return { error: 'Group not found.' };

  await deleteGroup(groupCode);

  redirect('/');
}
