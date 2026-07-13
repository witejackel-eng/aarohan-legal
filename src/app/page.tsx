"use client";

import { useRef, useState } from "react";
import { ViewRouterProvider, useViewRouter } from "@/lib/view-router";
import { DisclaimerGate } from "@/components/legal/DisclaimerGate";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FullscreenIndex } from "@/components/navigation/FullscreenIndex";
import { HomePage } from "@/components/views/HomePage";
import { FirmView } from "@/components/views/FirmView";
import { PracticeView } from "@/components/views/PracticeView";
import { PracticeDetailView } from "@/components/views/PracticeDetailView";
import { PerspectivesView } from "@/components/views/PerspectivesView";
import { PerspectiveDetailView } from "@/components/views/PerspectiveDetailView";
import { ContactView } from "@/components/views/ContactView";
import {
  DisclaimerView,
  PrivacyView,
  TermsView,
  AccessibilityView,
} from "@/components/views/LegalViews";
import { NotFoundView } from "@/components/views/NotFoundView";
import { siteConfig } from "@/config/site";

export default function Page() {
  return (
    <ViewRouterProvider>
      <DisclaimerGate>
        <Shell />
      </DisclaimerGate>
    </ViewRouterProvider>
  );
}

function Shell() {
  const router = useViewRouter();
  const [indexOpen, setIndexOpen] = useState(false);
  const indexTriggerRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="relative min-h-screen flex flex-col">
      <SkipLink />
      <SiteHeader
        onIndexClick={() => setIndexOpen(true)}
      />
      <FullscreenIndex
        open={indexOpen}
        onClose={() => setIndexOpen(false)}
        triggerRef={indexTriggerRef}
      />
      {/* Ref to satisfy SiteHeader's potential trigger wiring */}
      <div className="flex-1">
        <ViewSwitcher
          view={router.view}
          params={router.params}
        />
      </div>
      <SiteFooter />
    </div>
  );
}

function ViewSwitcher({
  view,
  params,
}: {
  view: ReturnType<typeof useViewRouter>["view"];
  params: ReturnType<typeof useViewRouter>["params"];
}) {
  // Render the appropriate view. Use `key` so the view re-mounts on
  // navigation — this gives us clean focus management and ensures
  // stale state from a previous view is cleared.
  switch (view) {
    case "home":
      return <HomePage key="home" />;
    case "firm":
      return <FirmView key="firm" />;
    case "practice":
      return <PracticeView key="practice" />;
    case "practice-detail":
      return <PracticeDetailView key={`pd-${params.slug}`} slug={params.slug ?? ""} />;
    case "perspectives":
      return <PerspectivesView key="perspectives" />;
    case "perspective-detail":
      return (
        <PerspectiveDetailView
          key={`p-${params.slug}`}
          slug={params.slug ?? ""}
        />
      );
    case "contact":
      return <ContactView key="contact" />;
    case "disclaimer":
      return <DisclaimerView key="disclaimer" />;
    case "privacy":
      return <PrivacyView key="privacy" />;
    case "terms":
      return <TermsView key="terms" />;
    case "accessibility":
      return <AccessibilityView key="accessibility" />;
    case "people":
      // People is disabled until verified data exists. Render a
      // graceful "not available" view rather than fabricated profiles.
      return <PeopleDisabledView key="people" />;
    case "not-found":
    default:
      return <NotFoundView key="404" />;
  }
}

function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[300] focus:bg-[var(--aarohan-ink)] focus:text-[var(--aarohan-paper)] focus:px-4 focus:py-2 focus:font-mono-label"
    >
      Skip to main content
    </a>
  );
}

/**
 * People view — disabled by default. Per brand brief §14, the route
 * is hidden until verified lawyer data exists. The template is
 * available in src/config/site.ts (lawyerProfiles) and the page
 * would render once profiles with `verified: true` are supplied.
 */
function PeopleDisabledView() {
  return (
    <main id="main" className="pt-32 px-5 md:px-8 max-w-[1600px] mx-auto" tabIndex={-1}>
      <p className="font-mono-label text-[var(--aarohan-red)]">PEOPLE</p>
      <h1 className="mt-4 section-heading text-[var(--aarohan-ink)]">
        People — pending verification.
      </h1>
      <p className="mt-6 max-w-[68ch] editorial-body text-[var(--aarohan-ink-muted)]">
        Individual profiles are not displayed until verified lawyer data
        has been supplied and reviewed against applicable Bar Council of
        India Rules and State Bar Council requirements. The practice is
        presented institutionally until that review is complete.
      </p>
      <p className="mt-4 font-mono-label text-[var(--aarohan-ink-muted)] normal-case tracking-normal text-xs">
        People page enabled in config:{" "}
        {String(siteConfig.features.peoplePageEnabled)}
      </p>
    </main>
  );
}
