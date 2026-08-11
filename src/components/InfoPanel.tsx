import {
  COLOUR_FORMATS,
  formatColour,
  getTextColour,
  type ColourFormatId,
} from "../lib/colour";
import { ChevronIcon, CopyIcon, TickIcon } from "./icons";

interface InfoPanelProps {
  hex: string | null;
  format: ColourFormatId;
  copied: boolean;
  copyError: string | null;
  onFormatChange: (format: ColourFormatId) => void;
  onCopy: (hex: string) => void;
}

export function InfoPanel({
  hex,
  format,
  copied,
  copyError,
  onFormatChange,
  onCopy,
}: InfoPanelProps) {
  if (!hex) {
    return (
      <section className="info-panel info-panel--empty" aria-label="Colour information">
        <p>Pick a colour or click a recent swatch to see its values here.</p>
      </section>
    );
  }

  const value = formatColour(hex, format);
  const foreground = getTextColour(hex);

  return (
    <section className="info-panel" aria-label="Colour information">
      <div
        className="info-panel__preview"
        style={{ backgroundColor: hex, color: foreground }}
      >
        <span className="info-panel__value">{value}</span>
      </div>

      <div className="info-panel__row">
        <FormatDropdown value={format} onChange={onFormatChange} />
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
      </div>
      {copyError && (
        <p className="copy-error" role="alert">
          {copyError}
        </p>
      )}
    </section>
  );
}

interface FormatDropdownProps {
  value: ColourFormatId;
  onChange: (format: ColourFormatId) => void;
}

function FormatDropdown({ value, onChange }: FormatDropdownProps) {
  return (
    <label className="format-dropdown">
      <span className="sr-only">Colour format</span>
      <select
        className="format-dropdown__select"
        value={value}
        onChange={(event) => onChange(event.target.value as ColourFormatId)}
      >
        {COLOUR_FORMATS.map((format) => (
          <option key={format.id} value={format.id}>
            {format.label}
          </option>
        ))}
      </select>
      <ChevronIcon className="format-dropdown__chevron" />
    </label>
  );
}
