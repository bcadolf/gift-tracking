import {
  date,
  pgTable,
  varchar,
  text,
  pgEnum,
  integer,
  numeric,
  index,
} from 'drizzle-orm/pg-core';
import { customAlphabet } from 'nanoid';

const memId = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 8);
const grpId = customAlphabet('ABCDEFGHIJKMNPQRTUVWXYZ23456789', 8);

export const icons = pgEnum('icon', [
  'alpaca',
  'bear',
  'boar',
  'cat',
  'cow',
  'crab',
  'fox',
  'shrimp',
  'bird',
  'octopus',
  'rose',
  'shark',
  'sprout',
  'wolf',
]);

export const color_choice = pgEnum('colorChoice', [
  'slate',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
]);

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
    colorChoice: color_choice('color_choice').notNull(),
    groupId: varchar('group_id', { length: 8 })
      .notNull()
      .references(() => groups.id, { onDelete: 'cascade' }),
  },
  (t) => [index('members_group_id_idx').on(t.groupId)],
);

export const gifts = pgTable(
  'gifts',
  {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    name: text('name').notNull(),
    link: text('link'),
    price: numeric('price', { precision: 10, scale: 2 }),
    addedBy: varchar('added_by', { length: 8 }).references(() => members.id, {
      onDelete: 'set null',
    }),
    giftFor: varchar('gift_for', { length: 8 })
      .notNull()
      .references(() => members.id, {
        onDelete: 'cascade',
      }),
    groupId: varchar('group_id', { length: 8 })
      .notNull()
      .references(() => groups.id, { onDelete: 'cascade' }),
  },
  (t) => [
    index('gifts_gift_for_idx').on(t.giftFor),
    index('gifts_added_by_idx').on(t.addedBy),
    index('gifts_group_id_idx').on(t.groupId),
  ],
);
