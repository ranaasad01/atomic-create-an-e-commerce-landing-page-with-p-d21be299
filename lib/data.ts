export type NavLink = {
  label: string;
  href: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
  description: string;
};

export const APP_NAME = "Lumière";
export const APP_TAGLINE = "Curated Modern Living";

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "#products" },
  { label: "Collections", href: "#collections" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#newsletter" },
];

export const navCTA = {
  label: "Shop Now",
  href: "#products",
};

export const CATEGORIES = [
  "All",
  "Living Room",
  "Bedroom",
  "Kitchen",
  "Lighting",
  "Outdoor",
] as const;

export type Category = (typeof CATEGORIES)[number];