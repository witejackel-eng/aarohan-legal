"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/**
 * View router.
 *
 * Per project constraints, only the `/` route is user-visible in the
 * preview environment. The brand brief demands a multi-page-feeling
 * experience (firm, practice, practice detail, perspectives,
 * perspectives detail, contact, disclaimer, privacy, terms,
 * accessibility). This router reconciles the two by managing view
 * state on the client while keeping the user on `/`.
 *
 * Behaviour:
 *   - State is held in `view` (e.g. "home", "firm", "practice",
 *     "practice-detail", "perspectives", "perspective-detail",
 *     "contact", "disclaimer", "privacy", "terms", "accessibility").
 *   - A `params` field carries optional sub-state (e.g. the practice
 *     slug or perspective slug for detail views).
 *   - On every navigation we scroll to top and push state to
 *     `history.replaceState` so browser back/forward behave
 *     predictably within the single route.
 *   - The router preserves focus management responsibility to the
 *     calling view (each view's first heading is auto-focused on
 *     mount via a `key` change in the page).
 */

export type ViewName =
  | "home"
  | "firm"
  | "practice"
  | "practice-detail"
  | "perspectives"
  | "perspective-detail"
  | "people"
  | "contact"
  | "disclaimer"
  | "privacy"
  | "terms"
  | "accessibility"
  | "not-found";

export type ViewParams = {
  slug?: string;
};

type ViewState = {
  view: ViewName;
  params: ViewParams;
};

type RouterContextValue = {
  view: ViewName;
  params: ViewParams;
  navigate: (view: ViewName, params?: ViewParams) => void;
  back: () => void;
};

const RouterContext = createContext<RouterContextValue | null>(null);

const STORAGE_KEY = "aarohan.view-state";

function parseHash(): ViewState | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash.replace(/^#/, "");
  if (!hash) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(hash));
    if (
      parsed &&
      typeof parsed.view === "string" &&
      typeof parsed.params === "object" &&
      parsed.params !== null
    ) {
      return parsed as ViewState;
    }
  } catch {
    /* ignore */
  }
  return null;
}

export function ViewRouterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<ViewState>({ view: "home", params: {} });

  // Initialise from hash on mount (so refresh / shared links restore view)
  useEffect(() => {
    const fromHash = parseHash();
    if (fromHash) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState(fromHash);
    } else {
      // Restore last view from sessionStorage for back-from-disclaimer
      try {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored) as ViewState;
          if (parsed && typeof parsed.view === "string") {
            setState(parsed);
          }
        }
      } catch {
        /* ignore */
      }
    }
  }, []);

  const navigate = useCallback((view: ViewName, params: ViewParams = {}) => {
    const next: ViewState = { view, params };
    setState(next);
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
    // Encode view in hash for shareability + back/forward
    if (typeof window !== "undefined") {
      const hash = encodeURIComponent(JSON.stringify(next));
      window.history.pushState({ view, params }, "", `#${hash}`);
      // Scroll to top after navigation
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, []);

  const back = useCallback(() => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  }, []);

  // Listen to popstate (browser back/forward)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = () => {
      const fromHash = parseHash();
      if (fromHash) {
        setState(fromHash);
        window.scrollTo({ top: 0, behavior: "auto" });
      } else {
        setState({ view: "home", params: {} });
      }
    };
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  const value = useMemo<RouterContextValue>(
    () => ({ view: state.view, params: state.params, navigate, back }),
    [state, navigate, back]
  );

  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
}

export function useViewRouter(): RouterContextValue {
  const ctx = useContext(RouterContext);
  if (!ctx) {
    throw new Error("useViewRouter must be used within a ViewRouterProvider");
  }
  return ctx;
}

/**
 * Map a view to a human-readable label for the header context chip.
 */
export function viewLabel(view: ViewName, params: ViewParams): string {
  switch (view) {
    case "home":
      return "Index";
    case "firm":
      return "01 — The Practice";
    case "practice":
      return "02 — Practice";
    case "practice-detail":
      return `02 — Practice / ${params.slug ?? ""}`;
    case "perspectives":
      return "04 — Perspectives";
    case "perspective-detail":
      return "04 — Perspectives / Article";
    case "people":
      return "03 — People";
    case "contact":
      return "05 — General Enquiries";
    case "disclaimer":
      return "Legal — Disclaimer";
    case "privacy":
      return "Legal — Privacy";
    case "terms":
      return "Legal — Terms";
    case "accessibility":
      return "Legal — Accessibility";
    case "not-found":
      return "404 — Not Found";
    default:
      return "Index";
  }
}
