export const USER_COLORS = [
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
] as const;

export type UserColor = (typeof USER_COLORS)[number];

export function safeUserColor(color: string) {
  return (USER_COLORS as readonly string[]).includes(color) ? color : undefined;
}
