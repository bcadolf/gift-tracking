interface ActionButtonProps {
  name: string;
  onClick?: () => void;
  type: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  form?: string;
  className?: string;
}

export default function ActionButton({
  name,
  onClick,
  type,
  disabled,
  form,
  className,
}: ActionButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      form={form}
      disabled={disabled}
      className={`rounded-md bg-primary border-2 border-primary-soft transition-colors hover:border-accent px-2 py-1 text-primary-foreground hover:bg-primary-hover shadow-md shadow-current hover:shadow-sm ${className}`}
    >
      {name}
    </button>
  );
}
