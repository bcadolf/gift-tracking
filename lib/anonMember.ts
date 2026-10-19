import { ICON_IDS, IconId } from './icons';
import { USER_COLORS, UserColor } from './userColors';
import { pick, capitalizeFirstLetter } from './utilities';

type Combo = { icon: IconId; colorChoice: UserColor };

const ALL_COMBOS: Combo[] = ICON_IDS.flatMap((icon) =>
  USER_COLORS.map((colorChoice) => ({ icon, colorChoice })),
);

export function memAnon(taken: Combo[] = []) {
  const used = new Set(taken.map((t) => `${t.icon}:${t.colorChoice}`));
  const free = ALL_COMBOS.filter(
    (c) => !used.has(`${c.icon}:${c.colorChoice}`),
  );

  if (free.length === 0) throw new Error('No free icon/color combinations');

  const { icon, colorChoice } = pick(free);
  return {
    name: `Anonymous ${capitalizeFirstLetter(colorChoice)} ${capitalizeFirstLetter(icon)}`,
    icon,
    colorChoice,
  };
}
