import { ICON_IDS } from '@/lib/icons';
import { USER_COLORS } from '@/lib/userColors';
import {
  date,
  pgTable,
  varchar,
  text,
  pgEnum,
  numeric,
  unique,
  index,
  boolean,
  bigint,
} from 'drizzle-orm/pg-core';
import { customAlphabet } from 'nanoid';

const memId = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 8);
const grpId = customAlphabet('ABCDEFGHIJKMNPQRTUVWXYZ23456789', 8);

export const icons = pgEnum('icon', ICON_IDS);

export const colorChoice = pgEnum('color_choice', USER_COLORS);

export const groups = pgTable('groups', {
  id: varchar('id', { length: 8 })
    .primaryKey()
    .$defaultFn(() => grpId()),
  name: varchar('name', { length: 50 }).notNull(),
  event: varchar('event', { length: 25 }).notNull(),
  date: date('date').notNull(),
});

export const members = pgTable(
  'members',
  {
    id: varchar('id', { length: 8 })
      .primaryKey()
      .$defaultFn(() => memId()),
    name: text('name').notNull(),
    icon: icons('icon').notNull(),
    colorChoice: colorChoice('color_choice').notNull(),
    groupId: varchar('group_id', { length: 8 })
      .notNull()
      .references(() => groups.id, { onDelete: 'cascade' }),
  },
  (t) => [
    index('members_group_id_idx').on(t.groupId),
    unique('members_group_icon_color_unq').on(t.groupId, t.icon, t.colorChoice),
  ],
);

export const gifts = pgTable(
  'gifts',
  {
    id: bigint('id', { mode: 'number' })
      .primaryKey()
      .generatedAlwaysAsIdentity(),
    name: text('name').notNull(),
    link: text('link'),
    price: numeric('price', { precision: 10, scale: 2 }),
    reserved: boolean('reserved').notNull().default(false),
    addedBy: varchar('added_by', { length: 8 }).references(() => members.id, {
      onDelete: 'set null',
    }),
    giftFor: varchar('gift_for', { length: 8 })
      .notNull()
      .references(() => members.id, {
        onDelete: 'cascade',
      }),
  },
  (t) => [
    index('gifts_gift_for_idx').on(t.giftFor),
    index('gifts_added_by_idx').on(t.addedBy),
  ],
);
