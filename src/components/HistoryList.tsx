import type { HistoryEntry } from "../hooks/useHistory";
import { TickIcon } from "./icons";

interface HistoryListProps {
  entries: HistoryEntry[];
  copiedHex: string | null;
  onSelect: (hex: string) => void;
  onClear: () => void;
}

export function HistoryList({ entries, copiedHex, onSelect, onClear }: HistoryListProps) {
  return (
    <section className="history" aria-label="Recent colours">
      <div className="section-heading">
        <h2 className="section-heading__title">Recent colours</h2>
        <div className="section-heading__actions">
          <span className="section-heading__count">{entries.length}/10</span>
          {entries.length > 0 && (
            <button type="button" className="section-heading__clear" onClick={onClear}>
              Clear
            </button>
          )}
        </div>
      </div>

      {entries.length === 0 ? (
        <p className="history__empty">
          No colours yet. Click <strong>Pick a colour</strong> to get your first one.
        </p>
      ) : (
        <ul className="history__grid">
          {entries.map((entry) => {
            const isCopied = copiedHex === entry.hex;
            return (
              <li key={entry.id}>
                <button
                  type="button"
                  className={`swatch${isCopied ? " swatch--copied" : ""}`}
                  style={{ backgroundColor: entry.hex }}
                  onClick={() => onSelect(entry.hex)}
                  title={`Select ${entry.hex}`}
                  aria-label={`Select colour ${entry.hex}`}
                >
                  {isCopied && (
                    <span className="swatch__tick" aria-hidden="true">
                      <TickIcon />
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
