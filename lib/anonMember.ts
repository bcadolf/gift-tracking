import { Combo, getFreeIconCombos } from './icons';
import { pick, capitalizeFirstLetter } from './utilities';

export function memAnon(taken: Combo[] = []) {
  const free = getFreeIconCombos(taken);

  if (free.length === 0) throw new Error('No free icon/color combinations');

  const { icon, colorChoice } = pick(free);
  return {
    name: `Anonymous ${capitalizeFirstLetter(colorChoice)} ${capitalizeFirstLetter(icon)}`,
    icon,
    colorChoice,
  };
}
