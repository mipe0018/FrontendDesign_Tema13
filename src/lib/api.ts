/**
 * Datatyper for FTK API'et – afledt af den faktiske JSON-struktur
 * på https://ftk-api.pages.dev.
 */

/** Billede fra API'et (ekstern URL – domænet er godkendt i astro.config.mjs). */
export interface ApiImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/** Sektionsbilleder har derudover en valgfri caption. */
export interface CaseSectionImage extends ApiImage {
  caption?: string;
}

export interface CaseDetails {
  caseName: string;
  category: string;
  date: string;
  /** Kan mangle i API'ets svar – derfor valgfri. */
  buttonLabel?: string;
  image: ApiImage;
}

export interface CaseSection {
  title: string;
  /** Enten én tekststreng eller et array af afsnit. */
  content: string | string[];
  highlights?: string[];
  image?: CaseSectionImage;
}

export interface CaseStudy {
  id: number;
  slug: string;
  title: string;
  caseDetails: CaseDetails;
  /** Kan mangle – komponenten giver tomt default (`= []`). */
  sections?: CaseSection[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface TeamMember {
  id: number;
  name: string;
  title: string;
  description: string;
  description_long: string;
  past_experience: string;
  social_links: SocialLink[];
  slug: string;
  image: ApiImage;
}

async function apiFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export function getCaseStudies(): Promise<CaseStudy[]> {
  return apiFetch<CaseStudy[]>("https://ftk-api.pages.dev/case-studies");
}

export function getTeamMembers(): Promise<TeamMember[]> {
  return apiFetch<TeamMember[]>("https://ftk-api.pages.dev/team");
}
