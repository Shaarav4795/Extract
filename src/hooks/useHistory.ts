import { useCallback, useState } from "react";
import { readStorage, writeStorage } from "../lib/storage";

export interface HistoryEntry {
  id: string;
  hex: string;
}

const STORAGE_KEY = "extract.colourHistory";
const MAX_ENTRIES = 10;

function load(): HistoryEntry[] {
  const raw = readStorage(STORAGE_KEY);
  if (raw === null) return [];

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((entry): entry is HistoryEntry => {
        if (typeof entry !== "object" || entry === null) return false;
        const e = entry as Record<string, unknown>;
        return typeof e.id === "string" && typeof e.hex === "string";
      })
      .slice(0, MAX_ENTRIES);
  } catch {
    return [];
  }
}

function persist(entries: HistoryEntry[]): void {
  writeStorage(STORAGE_KEY, JSON.stringify(entries));
}

export function useHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>(load);

  const add = useCallback(
    (hex: string) => {
      const normalised = hex.trim().toUpperCase();
      const next: HistoryEntry[] = [
        {
          id: crypto.randomUUID(),
          hex: normalised,
        },
        ...history.filter((entry) => entry.hex !== normalised),
      ].slice(0, MAX_ENTRIES);
      setHistory(next);
      persist(next);
    },
    [history],
  );

  const clear = useCallback(() => {
    setHistory([]);
    persist([]);
  }, []);

  return { history, add, clear };
}
