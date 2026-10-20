import Button from "@/components/ui/Button";

interface ApplicationButtonProps {
  /** The application form, or null while the application is not open yet. */
  href: string | null;
  label: string;
  className?: string;
}

/** An Apply button, or a muted "Application opens soon" note until the form is live. */
export default function ApplicationButton({ href, label, className }: ApplicationButtonProps) {
  if (!href) {
    return (
      <span aria-disabled="true" className={`mono-label inline-flex min-h-12 items-center text-slate-500 ${className ?? ""}`}>
        Application opens soon
      </span>
    );
  }
  return (
    <Button href={href} external className={className}>
      {label}
    </Button>
  );
}
