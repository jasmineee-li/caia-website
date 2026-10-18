import Button from "@/components/ui/Button";

interface ApplicationButtonProps {
  /** The application form, or null while the application is not open yet. */
  href: string | null;
  label: string;
}

/** An Apply button, or a muted "Application opens soon" placeholder until the form is live. */
export default function ApplicationButton({ href, label }: ApplicationButtonProps) {
  if (!href) {
    return (
      <span
        aria-disabled="true"
        className="inline-flex min-h-11 cursor-default items-center gap-2 rounded-full bg-slate-50 px-5 py-2.5 text-sm font-medium leading-6 text-slate-500 ring-1 ring-inset ring-slate-200"
      >
        Application opens soon
      </span>
    );
  }
  return (
    <Button href={href} external>
      {label}
    </Button>
  );
}
