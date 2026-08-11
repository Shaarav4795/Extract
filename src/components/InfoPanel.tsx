import { CopyIcon, TickIcon } from "./icons";

interface InfoPanelProps {
  hex: string | null;
  copied: boolean;
  copyError: string | null;
  onCopy: (hex: string) => void;
}

export function InfoPanel({ hex, copied, copyError, onCopy }: InfoPanelProps) {
  if (!hex) {
    return (
      <section className="info-panel info-panel--empty" aria-label="Colour information">
        <p>Pick a colour or click a recent swatch to see its values here.</p>
      </section>
    );
  }

  return (
    <section className="info-panel" aria-label="Colour information">
      <div className="info-panel__preview" style={{ backgroundColor: hex, color: "#ffffff" }}>
        <span className="info-panel__value">{hex}</span>
      </div>

      <button
        type="button"
        className={`copy-button${copied ? " copy-button--copied" : ""}`}
        onClick={() => onCopy(hex)}
      >
        {copied ? (
          <>
            <TickIcon />
            Copied
          </>
        ) : (
          <>
            <CopyIcon />
            Copy
          </>
        )}
      </button>
      {copyError && (
        <p className="copy-error" role="alert">
          {copyError}
        </p>
      )}
    </section>
  );
}
