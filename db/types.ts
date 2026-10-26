import { members, groups, gifts } from '@/db/schema';
import { IconId } from '@/lib/icons';

// Member Types
export type Member = typeof members.$inferSelect;
export type NewMember = typeof members.$inferInsert;
export type CreateNewMemberParams = Pick<
  typeof members.$inferInsert,
  'name' | 'icon' | 'colorChoice' | 'groupId'
>;
export type MemberPartial = Partial<Member>;

// Group types
export type Group = typeof groups.$inferSelect;
export type CreateNewGroupParams = {
  name: string;
  event: string;
  date: string;
};

// gift types
export type Gift = typeof gifts.$inferSelect;
