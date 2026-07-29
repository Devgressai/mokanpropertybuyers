import type { StateCode } from "@/data/geography";

export type PageType =
  | "state"
  | "county"
  | "city"
  | "region"
  | "situation"
  | "propertyType"
  | "financing"
  | "guide"
  | "countyTopic"
  | "stateLine";

export interface SeoPage {
  slug: string;
  title: string;
  h1: string;
  type: PageType;
  /** Required for state, county, and city pages. Absent on statewide-neutral silos. */
  stateCode?: StateCode;
  parentSlug?: string;
  childSlugs?: string[];
  nearbySlugs?: string[];
  priority: number;
  metaDescription: string;
  heroSubtext?: string;
}

export interface LinkItem {
  slug: string;
  title: string;
  reason: "parent" | "child" | "nearby" | "sibling" | "state" | "situation";
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}
