import Image from "next/image";

interface ProfileCardProps {
  imageSrc: string;
  name: string;
  role?: string;
  altText?: string;
  linkedinUrl?: string;
  scholarUrl?: string;
  websiteUrl?: string;
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19ZM8.34 10.11H5.66V18.5H8.34V10.11ZM7 5.84A1.53 1.53 0 1 0 7 8.89A1.53 1.53 0 1 0 7 5.84ZM18.34 13.57C18.34 10.85 16.88 9.58 14.93 9.58C13.36 9.58 12.66 10.44 12.27 11.04V10.11H9.66V18.5H12.34V13.84C12.34 12.61 12.57 11.42 14.09 11.42C15.59 11.42 15.61 12.82 15.61 13.92V18.5H18.34V13.57Z"
      />
    </svg>
  );
}

function ScholarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3ZM6 13.18V16.18C6 18.88 8.69 21 12 21C15.31 21 18 18.88 18 16.18V13.18L12 16.5L6 13.18Z"
      />
    </svg>
  );
}

function WebsiteIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2A10 10 0 1 0 12 22A10 10 0 1 0 12 2ZM4.06 11H7.08C7.19 8.8 7.82 6.82 8.78 5.37A8.03 8.03 0 0 0 4.06 11ZM4.06 13A8.03 8.03 0 0 0 8.78 18.63C7.82 17.18 7.19 15.2 7.08 13H4.06ZM11 19.74C9.86 19.25 8.93 16.56 8.82 13H11V19.74ZM11 11H8.82C8.93 7.44 9.86 4.75 11 4.26V11ZM13 4.26C14.14 4.75 15.07 7.44 15.18 11H13V4.26ZM13 19.74V13H15.18C15.07 16.56 14.14 19.25 13 19.74ZM15.22 18.63C16.18 17.18 16.81 15.2 16.92 13H19.94A8.03 8.03 0 0 1 15.22 18.63ZM16.92 11C16.81 8.8 16.18 6.82 15.22 5.37A8.03 8.03 0 0 1 19.94 11H16.92Z"
      />
    </svg>
  );
}

export default function ProfileCard({
  imageSrc,
  name,
  role,
  altText,
  linkedinUrl,
  scholarUrl,
  websiteUrl,
}: ProfileCardProps) {
  const links = [
    websiteUrl ? { href: websiteUrl, label: "Personal Website", icon: <WebsiteIcon /> } : null,
    scholarUrl ? { href: scholarUrl, label: "Google Scholar", icon: <ScholarIcon /> } : null,
    linkedinUrl ? { href: linkedinUrl, label: "LinkedIn", icon: <LinkedInIcon /> } : null,
  ].filter(Boolean) as { href: string; label: string; icon: React.ReactNode }[];

  return (
    <article className="surface-card flex h-full flex-col items-center px-4 py-6 text-center">
      <div className="relative mb-4 h-28 w-28 overflow-hidden rounded-full ring-2 ring-slate-200">
        <Image
          src={imageSrc}
          alt={altText || `${name}'s profile photo`}
          fill
          sizes="112px"
          loading="lazy"
          quality={75}
          className="object-cover"
        />
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{name}</h3>
      {role && <p className="mt-1 text-sm text-slate-600">{role}</p>}

      {links.length > 0 && (
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {links.map((link) => (
            <a
              key={`${name}-${link.label}`}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} ${link.label}`}
              title={link.label}
              className="focus-ring inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-100 p-2 text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
            >
              {link.icon}
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
