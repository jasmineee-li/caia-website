export interface NavItem {
  href: string;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/research", label: "Research" },
  { href: "/news", label: "News" },
  { href: "/events", label: "Events" },
  { href: "/get-involved", label: "Programs" },
  { href: "/team", label: "Team" },
  { href: "/resources", label: "Resources" },
];
