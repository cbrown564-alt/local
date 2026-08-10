import { initialOperatingPage, seededRequests } from "./fixture";
import type { OperatingPage, PublishResult, SimulatedRequest } from "./types";

const KEYS = {
  live: "mourne-operating-page:live",
  draft: "mourne-operating-page:draft",
  history: "mourne-operating-page:history",
  inbox: "mourne-operating-page:inbox",
  session: "mourne-operating-page:session",
} as const;

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

export class OperatingPageStore {
  private memory = new Map<string, string>();

  private read<T>(key: string, fallback: T): T {
    try {
      const raw = window.localStorage.getItem(key) ?? this.memory.get(key);
      return raw ? (JSON.parse(raw) as T) : clone(fallback);
    } catch {
      return clone(fallback);
    }
  }

  private write<T>(key: string, value: T): void {
    const raw = JSON.stringify(value);
    this.memory.set(key, raw);
    try {
      window.localStorage.setItem(key, raw);
    } catch {
      // The in-memory copy keeps the prototype usable when storage is blocked.
    }
  }

  loadLive(): OperatingPage {
    return this.read(KEYS.live, initialOperatingPage);
  }

  loadDraft(): OperatingPage {
    return this.read(KEYS.draft, this.loadLive());
  }

  saveDraft(draft: OperatingPage): void {
    this.write(KEYS.draft, draft);
  }

  async publish(draft: OperatingPage, simulateFailure = false): Promise<PublishResult> {
    await new Promise((resolve) => window.setTimeout(resolve, 420));
    if (simulateFailure) {
      throw new Error("The prototype stopped before anything went live.");
    }

    const previous = this.loadLive();
    const history = this.read<OperatingPage[]>(KEYS.history, []);
    const live: OperatingPage = {
      ...clone(draft),
      publishedAt: new Date().toISOString(),
      publishedBy: "Mara at Salt & Stem",
    };
    this.write(KEYS.history, [previous, ...history].slice(0, 8));
    this.write(KEYS.live, live);
    this.write(KEYS.draft, live);
    return { live, previous };
  }

  rollback(): OperatingPage | null {
    const history = this.read<OperatingPage[]>(KEYS.history, []);
    const previous = history.shift();
    if (!previous) return null;
    const current = this.loadLive();
    this.write(KEYS.live, previous);
    this.write(KEYS.draft, previous);
    this.write(KEYS.history, [current, ...history].slice(0, 8));
    return previous;
  }

  loadInbox(): SimulatedRequest[] {
    return this.read(KEYS.inbox, seededRequests);
  }

  saveRequest(request: SimulatedRequest): void {
    this.write(KEYS.inbox, [request, ...this.loadInbox()]);
  }

  markRequestAnswered(id: string): SimulatedRequest[] {
    const inbox = this.loadInbox().map((request) => request.id === id ? { ...request, answered: true } : request);
    this.write(KEYS.inbox, inbox);
    return inbox;
  }

  hasSession(): boolean {
    try {
      return window.sessionStorage.getItem(KEYS.session) === "prototype-only";
    } catch {
      return false;
    }
  }

  startSession(): void {
    try {
      window.sessionStorage.setItem(KEYS.session, "prototype-only");
    } catch {
      // A session without storage lasts only for this mounted page.
    }
  }
}
