export interface NavItem {
  href: string;
  label: string;
  activePaths?: string[];
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/research", label: "Research" },
  { href: "/events", label: "Events" },
  { href: "/news", label: "News" },
  { href: "/team", label: "Team" },
  { href: "/resources", label: "Resources" },
  { href: "/programs/cs1998", label: "CS 1998" },
  { href: "/join", label: "Get Involved", activePaths: ["/get-involved"] },
];
