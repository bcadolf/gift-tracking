import { getIcon, IconId } from '@/lib/icons';
import { safeUserColor } from '@/lib/userColors';

interface IconProps {
  id: IconId;
  colorChoice?: string;
}

export default function MemberIcon({ id, colorChoice = 'slate' }: IconProps) {
  const icon = getIcon(id);

  return (
    <div
      data-theme={safeUserColor(colorChoice)}
      className={`rounded-full bg-current/10 p-1 w-12 h-12 text-primary border border-current`}
    >
      <svg viewBox={icon.viewBox} role='img' aria-label={icon.name}>
        <path d={icon.dPath} fill='currentColor' />
      </svg>
    </div>
  );
}
