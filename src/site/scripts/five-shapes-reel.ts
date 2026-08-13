/**
 * /five-shapes/ plate reel — CSS scroll-snap does the paging; this wires the
 * strip and prev/next. Nothing auto-advances.
 */

const reduceMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const scrollBehavior = (): ScrollBehavior => (reduceMotion() ? "auto" : "smooth");

export function mountFiveShapesReel(root: HTMLElement = document.body): void {
  const reel = root.querySelector<HTMLElement>("[data-fvs-reel]");
  if (!reel) return;

  const scroller = reel.querySelector<HTMLElement>(".fvs-reel-scroller");
  const slides = [...reel.querySelectorAll<HTMLElement>(".fvs-reel-slide")];
  const prev = reel.querySelector<HTMLButtonElement>("[data-fvs-prev]");
  const next = reel.querySelector<HTMLButtonElement>("[data-fvs-next]");
  const stripLinks = [
    ...root.querySelectorAll<HTMLAnchorElement>("[data-fvs-page]"),
  ];

  if (!scroller || slides.length === 0) return;

  let index = 0;

  const syncUi = () => {
    if (prev) prev.disabled = index <= 0;
    if (next) next.disabled = index >= slides.length - 1;
    for (const link of stripLinks) {
      const target = link.getAttribute("data-fvs-page");
      const active = target === slides[index]?.dataset.plate;
      if (active) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    }
  };

  const goTo = (nextIndex: number, syncHash = false) => {
    const clamped = Math.max(0, Math.min(slides.length - 1, nextIndex));
    const slide = slides[clamped];
    if (!slide) return;
    slide.scrollIntoView({
      behavior: scrollBehavior(),
      inline: "start",
      block: "nearest",
    });
    index = clamped;
    syncUi();
    if (syncHash) {
      const id = slide.dataset.plate;
      if (id) history.replaceState(null, "", `#${id}`);
    }
  };

  prev?.addEventListener("click", () => goTo(index - 1, true));
  next?.addEventListener("click", () => goTo(index + 1, true));

  for (const link of stripLinks) {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("data-fvs-page");
      const slideIndex = slides.findIndex((slide) => slide.dataset.plate === id);
      if (slideIndex < 0) return;
      event.preventDefault();
      reel.scrollIntoView({ behavior: scrollBehavior(), block: "nearest" });
      goTo(slideIndex, true);
    });
  }

  const ratios = new Map<HTMLElement, number>();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        ratios.set(entry.target as HTMLElement, entry.intersectionRatio);
      }
      let best = index;
      let bestRatio = -1;
      for (const [i, slide] of slides.entries()) {
        const ratio = ratios.get(slide) ?? 0;
        if (ratio > bestRatio) {
          best = i;
          bestRatio = ratio;
        }
      }
      if (bestRatio <= 0 || best === index) return;
      index = best;
      syncUi();
    },
    { root: scroller, threshold: [0.35, 0.55, 0.75, 0.9] },
  );

  for (const slide of slides) {
    observer.observe(slide);

    const notes = slide.querySelectorAll<HTMLElement>("[data-fsp-note]");
    const markers = slide.querySelectorAll<HTMLElement>("[data-fsp-marker]");

    const setActive = (n: string | null) => {
      notes.forEach((note) => {
        note.classList.toggle("is-active", note.dataset.fspNote === n);
      });
      markers.forEach((marker) => {
        marker.classList.toggle("is-active", marker.dataset.fspMarker === n);
      });
    };

    notes.forEach((note) => {
      note.addEventListener("mouseenter", () => setActive(note.dataset.fspNote ?? null));
      note.addEventListener("mouseleave", () => setActive(null));
      note.addEventListener("focusin", () => setActive(note.dataset.fspNote ?? null));
      note.addEventListener("focusout", () => setActive(null));
    });

    markers.forEach((marker) => {
      marker.addEventListener("mouseenter", () => setActive(marker.dataset.fspMarker ?? null));
      marker.addEventListener("mouseleave", () => setActive(null));
    });
  }

  const hashId = window.location.hash.replace(/^#/, "");
  const hashIndex = slides.findIndex((slide) => slide.dataset.plate === hashId);
  if (hashIndex >= 0) {
    const slide = slides[hashIndex];
    if (slide) {
      slide.scrollIntoView({ behavior: "auto", inline: "start", block: "nearest" });
      index = hashIndex;
    }
  }
  syncUi();
}

