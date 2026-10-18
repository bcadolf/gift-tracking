import tempData from '@/lib/placeholder-data.json';

export async function GetGroupMembers(groupCode: string) {
  // import db query

  const groupMembers = tempData.members;

  return groupMembers;
}

export async function GetMemberData(groupCode: string, memberId: string) {
  // import db query to filter group member and return
  const memberData = tempData.members.find((m) => m.id === memberId);

  return memberData;
}
