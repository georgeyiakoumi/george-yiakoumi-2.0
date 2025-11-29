export const AUTHOR = {
  fullName: "George Yiakoumi",
  firstName: "George",
} as const;

export const SOCIAL_LINKS = {
  github: {
    url: "https://github.com/georgeyiakoumi",
    label: "GitHub",
    ariaLabel: `Visit ${AUTHOR.firstName}'s GitHub profile`,
  },
  linkedin: {
    url: "https://linkedin.com/in/georgeyiakoumi",
    label: "LinkedIn",
    ariaLabel: `Connect with ${AUTHOR.firstName} on LinkedIn`,
  },
} as const;

export const NAV_LINKS = {
  about: {
    href: "/about",
    label: "About",
    ariaLabel: `About ${AUTHOR.firstName}`,
  },
  portfolio: {
    href: "/portfolio",
    label: "Portfolio",
    ariaLabel: `View ${AUTHOR.firstName}'s portfolio`,
  },
  contact: {
    href: "/contact",
    label: "Contact",
    ariaLabel: `Contact ${AUTHOR.firstName}`,
  },
} as const;

export const COMPANIES = [
  {
    name: "HP",
    logo: "HP", // Replace with actual logo URL when available
    ariaLabel: "HP logo",
    className: "",
  },
  {
    name: "Novartis",
    logo: "Novartis",
    ariaLabel: "Novartis logo",
    className: "",
  },
  {
    name: "Johnson & Johnson",
    logo: "Johnson & Johnson",
    ariaLabel: "Johnson & Johnson logo",
    className: "",
  },
  {
    name: "Takeda",
    logo: "Takeda",
    ariaLabel: "Takeda logo",
    className: "",
  },
  {
    name: "Gofundme",
    logo: "Gofundme",
    ariaLabel: "Gofundme logo",
    className: "",
  },
  {
    name: "Wickes",
    logo: "Wickes",
    ariaLabel: "Wickes logo",
    className: "",
  },
  {
    name: "Ocean",
    logo: "Ocean",
    ariaLabel: "Ocean logo",
    className: "",
  },
  {
    name: "thinkmoney",
    logo: "thinkmoney",
    ariaLabel: "thinkmoney logo",
    className: "",
  },
] as const;

export const TOOLS = [
  {
    name: "JS",
    logo: "JS", // Replace with actual logo URL when available
    ariaLabel: "JavaScript logo",
    className: "",
  },
  {
    name: "TS",
    logo: "TS",
    ariaLabel: "TypeScript logo",
    className: "",
  },
  {
    name: "React",
    logo: "React",
    ariaLabel: "React logo",
    className: "",
  },
  {
    name: "Next",
    logo: "Next",
    ariaLabel: "Next.js logo",
    className: "",
  },
  {
    name: "Figma",
    logo: "Figma",
    ariaLabel: "Figma logo",
    className: "",
  },
  {
    name: "CSS",
    logo: "CSS",
    ariaLabel: "CSS logo",
    className: "",
  },
  {
    name: "Node",
    logo: "Node",
    ariaLabel: "Node.js logo",
    className: "",
  },
  {
    name: "Git",
    logo: "Git",
    ariaLabel: "Git logo",
    className: "",
  },
  {
    name: "PS",
    logo: "PS",
    ariaLabel: "Photoshop logo",
    className: "",
  },
  {
    name: "AI",
    logo: "AI",
    ariaLabel: "Illustrator logo",
    className: "",
  },
] as const;