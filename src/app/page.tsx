import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import Hero from "@/components/home/Hero";
import WhatWeBuy from "@/components/home/WhatWeBuy";
import HowOfferWorks from "@/components/home/HowOfferWorks";
import StateLineDifference from "@/components/home/StateLineDifference";
import WhereWeBuy from "@/components/home/WhereWeBuy";
import WrongMove from "@/components/home/WrongMove";
import OfferFormSection from "@/components/home/OfferFormSection";

export const metadata: Metadata = {
  title: `${SITE.name} | Cash Offers for Houses, Land, and Small Multifamily in Missouri and Kansas`,
  description: SITE.description,
  alternates: { canonical: SITE.url },
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <WhatWeBuy />
      <HowOfferWorks />
      <StateLineDifference />
      <WhereWeBuy />
      <WrongMove />
      <OfferFormSection />
    </main>
  );
}
