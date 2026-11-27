/* Brand-native cross-concept interaction & polish layer (Upgrades #1–#7).
   Progressively enhances all Mourne Made concepts while preserving guest voice,
   accessibility, reduced-motion preferences, and native fallbacks. */

const CLOSE_SVG = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`;
const MENU_SVG = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`;
const COPY_SVG = `<svg class="mm-ic-copy" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="5.5" y="5.5" width="8" height="8" rx="1.3" stroke="currentColor" stroke-width="1.4"/><path d="M10.5 5.5V3.8A1.3 1.3 0 0 0 9.2 2.5H3.8A1.3 1.3 0 0 0 2.5 3.8v5.4a1.3 1.3 0 0 0 1.3 1.3h1.7" stroke="currentColor" stroke-width="1.4"/></svg>`;
const CHECK_SVG = `<svg class="mm-ic-check" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const EXPAND_SVG = `<svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 2.5h3.5V6M6 13.5H2.5V10M13.5 2.5L9.2 6.8M2.5 13.5l4.3-4.3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const PHONE_SVG = `<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3.6 2.5h2.2l1 2.9-1.4 1.1a8.5 8.5 0 0 0 4.1 4.1l1.1-1.4 2.9 1v2.2a1.1 1.1 0 0 1-1.1 1.1C6.5 13.5 2.5 9.5 2.5 3.6a1.1 1.1 0 0 1 1.1-1.1Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>`;
const PIN_SVG = `<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 14s4.5-4.1 4.5-7.6a4.5 4.5 0 1 0-9 0C3.5 9.9 8 14 8 14Z" stroke="currentColor" stroke-width="1.4"/><circle cx="8" cy="6.4" r="1.5" stroke="currentColor" stroke-width="1.3"/></svg>`;

/* ==========================================================================
   Shared Helpers: Clipboard Copy (with VoiceOver repeat handling) & Dialogs
   ========================================================================== */

let lastLiveMessage = "";
const copyTimers = new WeakMap<HTMLElement, number>();

function legacyCopy(text: string): boolean {
  const previousFocus = document.activeElement as HTMLElement | null;
  const field = Object.assign(document.createElement("textarea"), { value: text });
  field.setAttribute("readonly", "");
  field.style.cssText = "position:fixed;inset-block-start:0;opacity:0";
  document.body.append(field);
  field.select();
  try {
    const legacyDoc = document as unknown as { execCommand?: (cmd: string) => boolean };
    return Boolean(legacyDoc.execCommand?.("copy"));
  } finally {
    field.remove();
    previousFocus?.focus({ preventScroll: true });
  }
}

async function writeClipboard(text: string): Promise<boolean> {
  if (!text) return false;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    return legacyCopy(text);
  } catch {
    return legacyCopy(text);
  }
}

function reportCopyState(button: HTMLElement, tip: HTMLElement, ok: boolean, label = "Copied") {
  const existing = copyTimers.get(button);
  if (existing) window.clearTimeout(existing);

  button.removeAttribute("data-copied");
  button.removeAttribute("data-failed");

  let message = ok ? label : "Copy failed";
  if (message === lastLiveMessage) message += "\u00A0";
  lastLiveMessage = message;

  tip.textContent = "";
  void button.offsetWidth;
  button.setAttribute(ok ? "data-copied" : "data-failed", "");
  requestAnimationFrame(() => {
    tip.textContent = message;
  });

  copyTimers.set(
    button,
    window.setTimeout(() => {
      button.removeAttribute("data-copied");
      button.removeAttribute("data-failed");
      tip.textContent = "";
    }, 2200),
  );
}

function attachLightDismissFallback(dialog: HTMLDialogElement) {
  if ("closedBy" in HTMLDialogElement.prototype) return;
  const outside = (e: PointerEvent) => {
    const r = dialog.getBoundingClientRect();
    return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
  };
  let pressedOutside = false;
  dialog.addEventListener("pointerdown", (e) => {
    pressedOutside = outside(e);
  });
  dialog.addEventListener("pointerup", (e) => {
    if (pressedOutside && outside(e)) dialog.close();
  });
}

/* ==========================================================================
   #1 Brand-Themed Enquiry Confirmation Sheet
   ========================================================================== */

export interface EnquiryDetail {
  to: string;
  subject: string;
  body: string;
  url?: string;
}

function initEnquirySheet() {
  const dialog = document.createElement("dialog");
  dialog.className = "mm-enquiry-dialog";
  dialog.setAttribute("closedby", "any");
  dialog.setAttribute("aria-labelledby", "mm-enq-title");

  dialog.innerHTML = `
    <div class="mm-enq-head">
      <div>
        <p class="mm-enq-kicker">Enquiry ready</p>
        <h1 class="mm-enq-title" id="mm-enq-title">Send your enquiry</h1>
      </div>
      <form method="dialog">
        <button class="mm-enq-close" type="submit" aria-label="Close dialogue">${CLOSE_SVG}</button>
      </form>
    </div>
    <div class="mm-enq-body">
      <div class="mm-enq-meta">
        <div class="mm-enq-meta-row">
          <span class="mm-enq-meta-label">To</span>
          <span class="mm-enq-meta-val" data-enq-to></span>
        </div>
        <div class="mm-enq-meta-row">
          <span class="mm-enq-meta-label">Subject</span>
          <span class="mm-enq-meta-val" data-enq-subject></span>
        </div>
      </div>
      <pre class="mm-enq-preview" data-enq-preview></pre>
    </div>
    <div class="mm-enq-actions">
      <a class="mm-enq-btn mm-enq-btn--primary" data-enq-mail href="#" autofocus>Open in Mail app →</a>
      <button type="button" class="mm-enq-btn mm-enq-btn--secondary" data-enq-copy>Copy message &amp; address</button>
      <div class="mm-enq-status">
        <span role="status" data-enq-status></span>
        <span data-enq-phone></span>
      </div>
    </div>
  `;

  document.body.appendChild(dialog);
  attachLightDismissFallback(dialog);

  const toEl = dialog.querySelector<HTMLElement>("[data-enq-to]")!;
  const subjEl = dialog.querySelector<HTMLElement>("[data-enq-subject]")!;
  const prevEl = dialog.querySelector<HTMLElement>("[data-enq-preview]")!;
  const mailLink = dialog.querySelector<HTMLAnchorElement>("[data-enq-mail]")!;
  const copyBtn = dialog.querySelector<HTMLButtonElement>("[data-enq-copy]")!;
  const statusEl = dialog.querySelector<HTMLElement>("[data-enq-status]")!;
  const phoneSlot = dialog.querySelector<HTMLElement>("[data-enq-phone]")!;

  let currentPayload: EnquiryDetail | null = null;

  copyBtn.addEventListener("click", async () => {
    if (!currentPayload) return;
    const text = `To: ${currentPayload.to}\nSubject: ${currentPayload.subject}\n\n${currentPayload.body}`;
    const ok = await writeClipboard(text);
    reportCopyState(copyBtn, statusEl, ok, "Copied message & email address");
  });

  dialog.addEventListener("close", () => {
    dialog.returnValue = "";
    statusEl.textContent = "";
  });

  const firstPhone = document.querySelector<HTMLAnchorElement>('main a[href^="tel:"], header a[href^="tel:"]');

  window.addEventListener("mm:enquiry", ((event: CustomEvent<EnquiryDetail>) => {
    const detail = event.detail;
    if (!detail?.to) return;
    event.preventDefault();

    const url =
      detail.url ||
      `mailto:${detail.to}?subject=${encodeURIComponent(detail.subject || "Enquiry")}&body=${encodeURIComponent(detail.body || "")}`;
    currentPayload = { ...detail, url };

    toEl.textContent = detail.to;
    subjEl.textContent = detail.subject || "Enquiry";
    prevEl.textContent = detail.body || "";
    mailLink.href = url;
    statusEl.textContent = "";

    if (firstPhone) {
      const num = firstPhone.textContent?.replace(/^[^0-9+]+/, "").trim() || firstPhone.getAttribute("href")?.replace("tel:", "") || "";
      phoneSlot.innerHTML = num ? `Or call <a href="${firstPhone.getAttribute("href")}">${num}</a>` : "";
    } else {
      phoneSlot.textContent = "";
    }

    if (!dialog.open) dialog.showModal();
  }) as EventListener);
}

/* ==========================================================================
   #2 Mobile Navigation Drawer (<dialog> + scroll-snap) & Quick-Action Dock
   ========================================================================== */

function initMobileNavAndDock() {
  const header = document.querySelector<HTMLElement>("body.concept-page > header");
  if (!header) return;

  const navEls = Array.from(header.querySelectorAll<HTMLElement>("nav"));
  const navLinks: { href: string; label: string }[] = [];
  const seen = new Set<string>();

  header.querySelectorAll<HTMLAnchorElement>("nav a[href]").forEach((a) => {
    const href = a.getAttribute("href") || "";
    const label = a.textContent?.trim() || "";
    if (!href || !label || seen.has(href)) return;
    seen.add(href);
    navLinks.push({ href, label });
  });

  const telLink = document.querySelector<HTMLAnchorElement>('header a[href^="tel:"], main a[href^="tel:"]');
  const mapLink = document.querySelector<HTMLAnchorElement>('main a[href*="google.com/maps"]');
  const primarySection =
    document.querySelector<HTMLElement>("#enquire, #survey, #rates, #ticket, #book, #vouchers, #visit") ||
    document.querySelector<HTMLElement>("main form");

  // 1. Mobile Navigation Drawer (shown only when desktop nav is hidden and header has no native <details> menu)
  const hasBuiltInMobileMenu = !!header.querySelector("details");
  if (!hasBuiltInMobileMenu && navEls.length > 0 && navLinks.length >= 2) {
    const drawerId = "mm-mobile-drawer";
    const businessName =
      header.querySelector("[class*='brand'] strong, .yw-wordmark")?.textContent?.trim() ||
      document.title.split("—")[0]?.trim() ||
      "Menu";

    const openBtn = document.createElement("button");
    openBtn.type = "button";
    openBtn.className = "mm-menu-trigger";
    openBtn.setAttribute("aria-label", "Open menu");
    openBtn.setAttribute("aria-expanded", "false");
    openBtn.setAttribute("aria-controls", drawerId);
    openBtn.innerHTML = `${MENU_SVG}<span>Menu</span>`;

    const headerBar = header.querySelector<HTMLElement>("[class*='inner'], [class*='wrap']") || header;
    headerBar.appendChild(openBtn);

    const drawer = document.createElement("dialog");
    drawer.className = "mm-drawer";
    drawer.id = drawerId;
    drawer.setAttribute("aria-label", `${businessName} navigation`);

    const linksHtml = navLinks
      .map(
        (item) =>
          `<li><a href="${item.href}"><span>${item.label}</span><span aria-hidden="true">→</span></a></li>`,
      )
      .join("");

    const telHref = telLink?.getAttribute("href") || "";
    const telText = telLink?.textContent?.replace(/^[^0-9+]+/, "").trim() || "";
    const footBtns: string[] = [];
    if (primarySection?.id) {
      footBtns.push(`<a class="mm-drawer-cta mm-drawer-cta--primary" href="#${primarySection.id}">Enquire / Book →</a>`);
    }
    if (telHref && telText) {
      footBtns.push(`<a class="mm-drawer-cta mm-drawer-cta--ghost" href="${telHref}">${PHONE_SVG}<span>Call ${telText}</span></a>`);
    }

    drawer.innerHTML = `
      <div class="mm-drawer-scroller">
        <nav class="mm-drawer-sheet" aria-label="${businessName} sections">
          <div class="mm-drawer-head">
            <span class="mm-drawer-brand">${businessName}</span>
            <button type="button" class="mm-drawer-close" aria-label="Close menu" autofocus>${CLOSE_SVG}</button>
          </div>
          <ul class="mm-drawer-links">${linksHtml}</ul>
          ${footBtns.length ? `<div class="mm-drawer-foot">${footBtns.join("")}</div>` : ""}
        </nav>
      </div>
    `;
    document.body.appendChild(drawer);

    const scroller = drawer.querySelector<HTMLElement>(".mm-drawer-scroller")!;
    const sheet = drawer.querySelector<HTMLElement>(".mm-drawer-sheet")!;
    const closeBtn = drawer.querySelector<HTMLButtonElement>(".mm-drawer-close")!;

    let drawerOpened = false;

    const openDrawer = async () => {
      if (drawer.open) return;
      drawer.showModal();
      drawerOpened = true;
      if (!CSS.supports("scroll-initial-target", "nearest")) {
        scroller.scrollTo({ left: scroller.offsetWidth, behavior: "instant" as ScrollBehavior });
        await new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));
      }
      scroller.scrollTo({ left: 0, behavior: "auto" });
    };

    const closeDrawer = () => {
      if (!drawer.open) return;
      scroller.scrollTo({ left: scroller.offsetWidth, behavior: "auto" });
      // Fallback timer in case reduced motion or narrow viewport doesn't trigger snap transition
      window.setTimeout(() => {
        if (drawer.open && scroller.scrollLeft >= sheet.offsetWidth * 0.85) {
          drawer.close();
          openBtn.setAttribute("aria-expanded", "false");
          drawerOpened = false;
        }
      }, 380);
    };

    if (!CSS.supports("animation-timeline: scroll()")) {
      scroller.addEventListener(
        "scroll",
        () => {
          const w = sheet.offsetWidth || 1;
          const ratio = Math.max(0, Math.min(1, 1 - scroller.scrollLeft / w));
          drawer.style.setProperty("--drawer-backdrop", String(ratio));
        },
        { passive: true },
      );
    }

    const visibleThreshold = Math.min(0.05, 1 / Math.max(320, window.innerWidth));
    const io = new IntersectionObserver(
      (entries) => {
        if (!drawerOpened) return;
        const entry = entries[entries.length - 1];
        if (!entry) return;
        if (entry.intersectionRatio < visibleThreshold && drawer.open) {
          drawer.close();
          openBtn.setAttribute("aria-expanded", "false");
          drawerOpened = false;
        } else if (entry.intersectionRatio >= 0.99) {
          openBtn.setAttribute("aria-expanded", "true");
        }
      },
      { root: drawer, threshold: [visibleThreshold, 1] },
    );
    io.observe(sheet);

    openBtn.addEventListener("click", openDrawer);
    closeBtn.addEventListener("click", closeDrawer);

    drawer.addEventListener("click", (e) => {
      if (!sheet.contains(e.target as Node)) closeDrawer();
    });

    drawer.addEventListener("cancel", (e) => {
      if (e.cancelable) {
        e.preventDefault();
        closeDrawer();
      }
    });

    drawer.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((a) => {
      a.addEventListener("click", () => {
        if (drawer.open) {
          drawer.close();
          openBtn.setAttribute("aria-expanded", "false");
          drawerOpened = false;
        }
      });
    });

    const syncTriggerVisibility = () => {
      const anyHidden = navEls.some((el) => getComputedStyle(el).display === "none");
      openBtn.classList.toggle("is-visible", anyHidden);
    };
    syncTriggerVisibility();
    window.addEventListener("resize", syncTriggerVisibility, { passive: true });
  }

  // 2. Smart Mobile Quick-Action Dock (≤768px, appears once hero scrolls past)
  const dockActions: { href: string; label: string; icon?: string; primary?: boolean; external?: boolean }[] = [];
  if (telLink) {
    dockActions.push({
      href: telLink.getAttribute("href") || "",
      label: "Call",
      icon: PHONE_SVG,
    });
  }
  if (primarySection?.id) {
    const labelMap: Record<string, string> = {
      survey: "Free Survey",
      rates: "Estimate",
      ticket: "Log Repair",
      vouchers: "Vouchers",
      book: "Book",
    };
    dockActions.push({
      href: `#${primarySection.id}`,
      label: labelMap[primarySection.id] || "Enquire",
      primary: true,
    });
  }
  if (mapLink) {
    dockActions.push({
      href: mapLink.getAttribute("href") || "",
      label: "Directions",
      icon: PIN_SVG,
      external: true,
    });
  }

  const hero = document.querySelector<HTMLElement>("main > section:first-child");
  if (hero && dockActions.length >= 2) {
    const dock = document.createElement("nav");
    dock.className = "mm-mobile-dock";
    dock.setAttribute("aria-label", "Quick actions");
    dock.innerHTML = dockActions
      .map(
        (act) =>
          `<a class="mm-dock-btn ${act.primary ? "mm-dock-btn--primary" : ""}" href="${act.href}"${
            act.external ? ' rel="noopener noreferrer"' : ""
          }>${act.icon || ""}<span>${act.label}</span></a>`,
      )
      .join("");
    document.body.appendChild(dock);

    const heroObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        dock.classList.toggle("is-visible", !entry.isIntersecting);
      },
      { threshold: 0.1 },
    );
    heroObserver.observe(hero);
  }
}

/* ==========================================================================
   #5 Live UK Opening Hours Status (Europe/London) & One-Click Copy Controls
   ========================================================================== */

type DayRange = [number, number]; // minutes from 00:00; end > 1440 means past midnight

interface ScheduleDef {
  bodyClass: string;
  selector: string;
  // 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
  days: Record<number, DayRange | null>;
}

const VERIFIED_SCHEDULES: ScheduleDef[] = [
  {
    bodyClass: "concept-flagstaff",
    selector: "dl.fl-times",
    days: {
      0: [11 * 60 + 30, 20 * 60 + 30],
      1: [16 * 60, 20 * 60 + 30],
      2: [16 * 60, 20 * 60 + 30],
      3: [16 * 60, 20 * 60 + 30],
      4: [16 * 60, 20 * 60 + 30],
      5: [12 * 60, 21 * 60],
      6: [12 * 60, 21 * 60],
    },
  },
  {
    bodyClass: "concept-belleek",
    selector: "dl.bc-bill-hours",
    days: {
      0: [12 * 60, 25 * 60],
      1: null,
      2: null,
      3: null,
      4: null,
      5: [16 * 60, 25 * 60],
      6: [12 * 60, 25 * 60],
    },
  },
  {
    bodyClass: "concept-mulberry",
    selector: "dl.mt-hours",
    days: {
      0: null,
      1: null,
      2: [10 * 60, 16 * 60],
      3: [10 * 60, 16 * 60],
      4: [10 * 60, 16 * 60],
      5: [10 * 60, 20 * 60],
      6: [10 * 60, 20 * 60],
    },
  },
  {
    bodyClass: "concept-rostrevorinn",
    selector: "dl.ri-hours",
    days: {
      0: [12 * 60 + 30, 22 * 60],
      1: [15 * 60, 23 * 60],
      2: [15 * 60, 23 * 60],
      3: [15 * 60, 23 * 60],
      4: [12 * 60 + 30, 23 * 60],
      5: [12 * 60 + 30, 23 * 60],
      6: [12 * 60 + 30, 23 * 60],
    },
  },
  {
    bodyClass: "concept-theoaks",
    selector: "#hours dl",
    days: {
      0: [12 * 60 + 30, 19 * 60 + 30],
      1: null,
      2: null,
      3: null,
      4: [12 * 60 + 30, 20 * 60],
      5: [12 * 60 + 30, 20 * 60 + 30],
      6: [12 * 60 + 30, 20 * 60 + 30],
    },
  },
  {
    bodyClass: "concept-avoca-hotel",
    selector: ".av-hours-summary",
    days: {
      0: [11 * 60, 25 * 60],
      1: [11 * 60, 25 * 60],
      2: [11 * 60, 25 * 60],
      3: [11 * 60, 25 * 60],
      4: [11 * 60, 25 * 60],
      5: [11 * 60, 25 * 60],
      6: [11 * 60, 25 * 60],
    },
  },
  {
    bodyClass: "concept-bsw-autohouse",
    selector: "main address",
    days: {
      0: null,
      1: [8 * 60 + 30, 17 * 60 + 30],
      2: [8 * 60 + 30, 17 * 60 + 30],
      3: [8 * 60 + 30, 17 * 60 + 30],
      4: [8 * 60 + 30, 17 * 60 + 30],
      5: [8 * 60 + 30, 17 * 60 + 30],
      6: null,
    },
  },
  {
    bodyClass: "concept-savoy",
    selector: "main address",
    days: {
      0: [8 * 60, 17 * 60],
      1: [8 * 60, 17 * 60],
      2: [8 * 60, 17 * 60],
      3: [8 * 60, 17 * 60],
      4: [8 * 60, 17 * 60],
      5: [8 * 60, 17 * 60],
      6: [8 * 60, 17 * 60],
    },
  },
  // Wave 3 verified schedules
  {
    bodyClass: "concept-yellowheifer",
    selector: ".yh-hours-list",
    days: {
      0: [11 * 60, 19 * 60 + 30],
      1: null,
      2: null,
      3: null,
      4: [11 * 60, 20 * 60],
      5: [11 * 60, 20 * 60 + 30],
      6: [11 * 60, 21 * 60],
    },
  },
  {
    bodyClass: "concept-raymies",
    selector: ".rm-hours-list",
    days: {
      0: [12 * 60 + 30, 20 * 60],
      1: null,
      2: null,
      3: [17 * 60, 21 * 60],
      4: [17 * 60, 21 * 60],
      5: [17 * 60, 21 * 60 + 30],
      6: [17 * 60, 21 * 60 + 30],
    },
  },
  {
    bodyClass: "concept-mmb",
    selector: ".mmb-hours-list",
    days: {
      0: null,
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: [16 * 60, 23 * 60],
    },
  },
  // Wave 4 verified schedules
  {
    bodyClass: "concept-thecuan",
    selector: ".tc-hours-list",
    days: {
      0: [8 * 60, 20 * 60],
      1: [8 * 60, 20 * 60],
      2: [8 * 60, 20 * 60],
      3: [8 * 60, 20 * 60],
      4: [8 * 60, 20 * 60],
      5: [8 * 60, 21 * 60],
      6: [8 * 60, 21 * 60],
    },
  },
  {
    bodyClass: "concept-gurunewry",
    selector: ".gi-hours-list",
    days: {
      0: [12 * 60 + 30, 21 * 60],
      1: [17 * 60, 22 * 60 + 30],
      2: [17 * 60, 22 * 60 + 30],
      3: [17 * 60, 22 * 60 + 30],
      4: [17 * 60, 22 * 60 + 30],
      5: [16 * 60, 23 * 60],
      6: [16 * 60, 23 * 60],
    },
  },
  // Wave 5 verified schedules
  {
    bodyClass: "concept-mauricemurphy",
    selector: ".mmc-hours-list",
    days: {
      0: null,
      1: [9 * 60, 17 * 60],
      2: [9 * 60, 17 * 60],
      3: [9 * 60, 17 * 60],
      4: [9 * 60, 17 * 60],
      5: [9 * 60, 17 * 60],
      6: [9 * 60, 15 * 60],
    },
  },
  {
    bodyClass: "concept-gullioncycles",
    selector: ".rgc-hours-list",
    days: {
      0: [12 * 60, 16 * 60],
      1: [9 * 60 + 30, 17 * 60 + 30],
      2: [9 * 60 + 30, 17 * 60 + 30],
      3: [9 * 60 + 30, 17 * 60 + 30],
      4: [9 * 60 + 30, 17 * 60 + 30],
      5: [9 * 60 + 30, 17 * 60 + 30],
      6: [10 * 60, 17 * 60],
    },
  },
  {
    bodyClass: "concept-magherainn",
    selector: ".mi-hours-list",
    days: {
      0: [11 * 60 + 30, 23 * 60],
      1: [11 * 60 + 30, 23 * 60],
      2: [11 * 60 + 30, 23 * 60],
      3: [11 * 60 + 30, 23 * 60],
      4: [11 * 60 + 30, 23 * 60],
      5: [11 * 60 + 30, 25 * 60],
      6: [11 * 60 + 30, 25 * 60],
    },
  },
];

const WEEKDAY_MAP: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
const DAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatClock(totalMins: number): string {
  const m = ((totalMins % 1440) + 1440) % 1440;
  const h24 = Math.floor(m / 60);
  const mins = m % 60;
  const suffix = h24 >= 12 ? "pm" : "am";
  const h12 = h24 % 12 || 12;
  return mins === 0 ? `${h12}${suffix}` : `${h12}:${String(mins).padStart(2, "0")}${suffix}`;
}

function getUkNow(): { day: number; mins: number } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const wd = parts.find((p) => p.type === "weekday")?.value || "Mon";
  const hr = Number(parts.find((p) => p.type === "hour")?.value || "12") % 24;
  const mn = Number(parts.find((p) => p.type === "minute")?.value || "0");
  return { day: WEEKDAY_MAP[wd] ?? 1, mins: hr * 60 + mn };
}

function initLiveOpeningHours() {
  const sched = VERIFIED_SCHEDULES.find((s) => document.body.classList.contains(s.bodyClass));
  if (!sched) return;
  const target = document.querySelector<HTMLElement>(sched.selector);
  if (!target) return;

  const { day, mins } = getUkNow();
  const prevDay = (day + 6) % 7;
  const prevRange = sched.days[prevDay];
  const todayRange = sched.days[day];

  let isOpen = false;
  let text = "";

  // Check if still inside yesterday's past-midnight service (e.g. 00:30am when open until 1:00am)
  if (prevRange && prevRange[1] > 1440 && mins < prevRange[1] - 1440) {
    isOpen = true;
    text = `Open now · until ${formatClock(prevRange[1])}`;
  } else if (todayRange && mins >= todayRange[0] && mins < todayRange[1]) {
    isOpen = true;
    text = `Open now · until ${formatClock(todayRange[1])}`;
  } else if (todayRange && mins < todayRange[0]) {
    text = `Closed now · opens today at ${formatClock(todayRange[0])}`;
  } else {
    for (let offset = 1; offset <= 7; offset++) {
      const nextDay = (day + offset) % 7;
      const nextRange = sched.days[nextDay];
      if (nextRange) {
        const when = offset === 1 ? "tomorrow" : DAY_SHORT[nextDay];
        text = `Closed now · opens ${when} at ${formatClock(nextRange[0])}`;
        break;
      }
    }
  }

  if (!text) return;

  const pill = document.createElement("p");
  pill.className = "mm-hours-pill";
  pill.dataset.state = isOpen ? "open" : "closed";
  pill.innerHTML = `<span class="mm-hours-dot" aria-hidden="true"></span><span>${text}</span>`;
  target.parentNode?.insertBefore(pill, target);
}

function initInlineCopyButtons() {
  const seenEmails = new Set<string>();
  document.querySelectorAll<HTMLAnchorElement>('main a[href^="mailto:"]').forEach((link) => {
    const email = link.textContent?.trim() || "";
    if (!email.includes("@") || email.includes(" ") || seenEmails.has(email)) return;
    // Skip links styled as full CTA buttons
    if (link.className.includes("-btn")) return;
    seenEmails.add(email);

    const wrap = document.createElement("span");
    wrap.className = "mm-copy-wrap";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "mm-copy-btn";
    btn.setAttribute("aria-label", `Copy ${email}`);
    btn.innerHTML = `${COPY_SVG}${CHECK_SVG}`;

    const tip = document.createElement("span");
    tip.className = "mm-copy-tip";
    tip.setAttribute("role", "status");

    btn.addEventListener("click", async () => {
      const ok = await writeClipboard(email);
      reportCopyState(btn, tip, ok, "Copied");
    });

    wrap.append(btn, tip);
    link.insertAdjacentElement("afterend", wrap);
  });
}

/* ==========================================================================
   #6 Accessible Tablist Keyboard Navigation & Restrained Scroll Reveals
   ========================================================================== */

function initTablistPolish() {
  document.querySelectorAll<HTMLElement>('[role="tablist"]').forEach((list) => {
    const tabs = Array.from(list.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
    if (tabs.length < 2) return;

    list.addEventListener("keydown", (e) => {
      const current = document.activeElement as HTMLButtonElement | null;
      const idx = current ? tabs.indexOf(current) : -1;
      if (idx === -1) return;

      let nextIdx = -1;
      if (e.key === "ArrowRight") nextIdx = (idx + 1) % tabs.length;
      else if (e.key === "ArrowLeft") nextIdx = (idx - 1 + tabs.length) % tabs.length;
      else if (e.key === "Home") nextIdx = 0;
      else if (e.key === "End") nextIdx = tabs.length - 1;

      if (nextIdx !== -1) {
        e.preventDefault();
        tabs[nextIdx].focus();
        tabs[nextIdx].click();
      }
    });
  });
}

function initScrollReveals() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (typeof IntersectionObserver === "undefined") return;

  const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section:not(:first-child)"));
  const vh = window.innerHeight || 900;
  const targets: HTMLElement[] = [];

  for (const sec of sections) {
    const rect = sec.getBoundingClientRect();
    // Only mark sections below the initial fold so above-the-fold content never flickers
    if (rect.top > vh * 0.92) {
      sec.classList.add("mm-reveal-ready");
      targets.push(sec);
    }
  }

  if (!targets.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight) {
          entry.target.classList.add("is-revealed");
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.05, rootMargin: "0px 0px -24px 0px" },
  );

  targets.forEach((el) => io.observe(el));
}

/* ==========================================================================
   #7 Editorial Photo Lightbox (<dialog>)
   ========================================================================== */

function initEditorialLightbox() {
  const figures = Array.from(document.querySelectorAll<HTMLElement>("main > section:not(:first-child) figure"));
  const zoomables = figures.filter((fig) => {
    const img = fig.querySelector<HTMLImageElement>("img");
    if (!img) return false;
    // Skip tiny icons or hidden layers
    const w = img.naturalWidth || Number(img.getAttribute("width")) || 0;
    return w === 0 || w >= 400;
  });

  if (!zoomables.length) return;

  const dialog = document.createElement("dialog");
  dialog.className = "mm-lightbox";
  dialog.setAttribute("closedby", "any");
  dialog.setAttribute("aria-labelledby", "mm-lb-title");

  dialog.innerHTML = `
    <div class="mm-lb-bar">
      <h1 class="mm-lb-title" id="mm-lb-title">Image preview</h1>
      <form method="dialog">
        <button class="mm-lb-close" type="submit" aria-label="Close image preview" autofocus>${CLOSE_SVG}</button>
      </form>
    </div>
    <div class="mm-lb-stage">
      <img data-lb-img alt="" />
    </div>
    <p class="mm-lb-cap" data-lb-cap></p>
  `;
  document.body.appendChild(dialog);
  attachLightDismissFallback(dialog);

  const lbImg = dialog.querySelector<HTMLImageElement>("[data-lb-img]")!;
  const lbCap = dialog.querySelector<HTMLElement>("[data-lb-cap]")!;
  const lbTitle = dialog.querySelector<HTMLElement>("#mm-lb-title")!;

  const openLightbox = (img: HTMLImageElement, caption: string) => {
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt || "";
    const shortTitle = caption.split(".")[0]?.trim() || img.alt?.slice(0, 70) || "Image preview";
    lbTitle.textContent = shortTitle;
    lbCap.textContent = caption || img.alt || "";
    lbCap.hidden = !lbCap.textContent;
    if (!dialog.open) dialog.showModal();
  };

  zoomables.forEach((fig) => {
    const img = fig.querySelector<HTMLImageElement>("img");
    if (!img) return;
    fig.classList.add("mm-zoomable-figure");

    const caption = fig.querySelector("figcaption")?.textContent?.trim() || "";
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "mm-zoom-btn";
    btn.setAttribute("aria-label", caption ? `Expand image: ${caption}` : "Expand image");
    btn.innerHTML = `${EXPAND_SVG}<span>Expand</span>`;

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      openLightbox(img, caption);
    });
    img.addEventListener("click", () => openLightbox(img, caption));
    fig.appendChild(btn);
  });
}

function initLocalMaps() {
  document.querySelectorAll<HTMLElement>("[data-local-map]").forEach((card) => {
    const chips = Array.from(card.querySelectorAll<HTMLButtonElement>("[data-map-chip]"));
    const pins = Array.from(card.querySelectorAll<SVGElement>("[data-map-pin]"));
    if (!chips.length) return;

    let pinnedIdx: string | null = null;
    const setActive = (idx: string | null) => {
      chips.forEach((c) => c.classList.toggle("is-active", idx !== null && c.dataset.mapChip === idx));
      pins.forEach((p) => p.classList.toggle("is-active", idx !== null && p.dataset.mapPin === idx));
    };

    chips.forEach((chip) => {
      const idx = chip.dataset.mapChip ?? null;
      chip.addEventListener("mouseenter", () => setActive(idx));
      chip.addEventListener("mouseleave", () => setActive(pinnedIdx));
      chip.addEventListener("focus", () => setActive(idx));
      chip.addEventListener("blur", () => setActive(pinnedIdx));
      chip.addEventListener("click", () => {
        pinnedIdx = pinnedIdx === idx ? null : idx;
        setActive(pinnedIdx);
      });
    });
  });
}

function initSpecimenSheets() {
  document.querySelectorAll<HTMLDialogElement>("[data-specimen-dialog]").forEach((dialog) => {
    attachLightDismissFallback(dialog);

    const pills = Array.from(dialog.querySelectorAll<HTMLButtonElement>("[data-spec-filter]"));
    const groups = Array.from(dialog.querySelectorAll<HTMLElement>("[data-spec-group]"));
    pills.forEach((pill) => {
      pill.addEventListener("click", () => {
        const key = pill.dataset.specFilter || "all";
        pills.forEach((p) => p.classList.toggle("is-active", p === pill));
        groups.forEach((g) => {
          g.hidden = key !== "all" && g.dataset.specGroup !== key;
        });
      });
    });

    dialog.querySelectorAll<HTMLAnchorElement>(".mm-spec-foot a[href^='#']").forEach((a) => {
      a.addEventListener("click", () => {
        if (dialog.open) dialog.close();
      });
    });
  });

  document.querySelectorAll<HTMLButtonElement>("[data-specimen-open]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.specimenOpen;
      if (!id) return;
      const dialog = document.getElementById(id) as HTMLDialogElement | null;
      if (dialog && !dialog.open) dialog.showModal();
    });
  });
}

/* ==========================================================================
   Init
   ========================================================================== */

export function initConceptPolish() {
  if (!document.body.classList.contains("concept-page")) return;
  initEnquirySheet();
  initMobileNavAndDock();
  initLiveOpeningHours();
  initInlineCopyButtons();
  initTablistPolish();
  initScrollReveals();
  initEditorialLightbox();
  initLocalMaps();
  initSpecimenSheets();
}
