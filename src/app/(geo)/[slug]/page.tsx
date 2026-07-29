import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSeoSlugs, getPageBySlug } from "@/lib/seo/pageIndex";
import { robotsFor } from "@/lib/seo/indexation";
import { getPageContent } from "@/data/content-registry";
import { SITE } from "@/lib/site";
import { buildBreadcrumbs } from "@/lib/seo/placeCopy";
import type { SeoPage } from "@/types/seo";
import StatePage from "@/components/seo/StatePage";
import CountyPage from "@/components/seo/CountyPage";
import CityPage from "@/components/seo/CityPage";

export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return getAllSeoSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageBySlug(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.metaDescription,
    alternates: { canonical: `${SITE.url}/${slug}` },
    robots: robotsFor(slug),
  };
}

/** Resolves a list of slugs to their pages, dropping any that don't exist. */
function resolveAll(slugs: string[] | undefined): SeoPage[] {
  return (slugs ?? [])
    .map((s) => getPageBySlug(s))
    .filter((p): p is SeoPage => p !== undefined);
}

export default async function GeoPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const page = getPageBySlug(slug);
  if (!page) notFound();

  // Content is resolved SERVER-SIDE and passed as props. The page components
  // are client components; importing the registry into one would ship the
  // whole corpus to the browser.
  const content = getPageContent(slug)?.body ?? [];

  // Ancestors and siblings are resolved here too, for the same reason --
  // the components below never touch the page index directly.
  const parent = page.parentSlug ? getPageBySlug(page.parentSlug) : undefined;
  const grandparent = parent?.parentSlug ? getPageBySlug(parent.parentSlug) : undefined;
  const breadcrumbs = buildBreadcrumbs(page, parent, grandparent);
  const children = resolveAll(page.childSlugs);
  const nearby = resolveAll(page.nearbySlugs);

  switch (page.type) {
    case "state":
      return (
        <StatePage page={page} body={content} breadcrumbs={breadcrumbs} counties={children} />
      );
    case "county":
      return (
        <CountyPage
          page={page}
          body={content}
          breadcrumbs={breadcrumbs}
          state={parent}
          cities={children}
        />
      );
    case "city":
      return (
        <CityPage
          page={page}
          body={content}
          breadcrumbs={breadcrumbs}
          county={parent}
          nearby={nearby}
        />
      );
    default:
      notFound();
  }
}
