'use server';

import { customAlphabet } from 'nanoid';
import tempData from '@/lib/placeholder-data.json';

type CreateNewGroupParams = {
  name: string;
  event: string;
  date: string;
};

export async function CreateNewGroup({
  name,
  event,
  date,
}: CreateNewGroupParams) {
  const genCode = customAlphabet('ABCDEFGHIJKMNPQRTUVWXYZ23456789', 8);
  //   add logic to run db check for unique and save or rerun if needed. and add the db query import
  let groupCode = genCode();

  while (tempData.group.some((g) => g.id === groupCode)) {
    groupCode = genCode();
  }

  tempData.group.push({ id: groupCode, name, event, date });

  return groupCode;
}

export async function EnterGroup(groupCode: string) {
  // import db query to check group code and delele code below

  if (!tempData.group.find((g) => g.id === groupCode)) {
    return false;
  }

  return true;
}

export async function GetGroupData(groupCode: string) {
  // import db query to filter group and return

  const groupData = tempData.group.find((g) => g.id === groupCode); // replace with db result

  return groupData;
}
