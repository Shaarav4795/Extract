import { useCallback, useRef, useState } from "react";
import { Header } from "./components/Header";
import { HistoryList } from "./components/HistoryList";
import { InfoPanel } from "./components/InfoPanel";
import { PipetteIcon } from "./components/icons";
import { useHistory } from "./hooks/useHistory";
import { useTheme } from "./hooks/useTheme";
import { formatColour, type ColourFormatId } from "./lib/colour";

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { history, add, clear } = useHistory();

  const [currentHex, setCurrentHex] = useState<string | null>(null);
  const [format, setFormat] = useState<ColourFormatId>("hex");
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [pickError, setPickError] = useState<string | null>(null);
  const [copyError, setCopyError] = useState<string | null>(null);
  const copiedTimer = useRef<number | null>(null);

  const flashCopied = useCallback((hex: string) => {
    setCopiedHex(hex);
    if (copiedTimer.current !== null) window.clearTimeout(copiedTimer.current);
    copiedTimer.current = window.setTimeout(() => setCopiedHex(null), 1600);
  }, []);

  const copyColour = useCallback(
    async (hex: string) => {
      setCopyError(null);
      try {
        await navigator.clipboard.writeText(formatColour(hex, format));
        flashCopied(hex);
      } catch {
        setCopyError("Unable to copy the colour.");
      }
    },
    [format, flashCopied],
  );

  const pickColour = useCallback(async () => {
    setPickError(null);

    const dropper = window.EyeDropper;
    if (!dropper) {
      setPickError("Colour picking is not supported in this browser.");
      return;
    }

    try {
      const result = await new dropper().open();
      const hex = result.sRGBHex.toUpperCase();
      add(hex);
      setCurrentHex(hex);
      setCopyError(null);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setPickError("Unable to pick a colour right now.");
    }
  }, [add]);

  return (
    <div className="app">
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main className="app__body">
        <button type="button" className="pick-button" onClick={pickColour}>
          <PipetteIcon className="pick-button__icon" />
          <span>Pick a colour</span>
        </button>
        {pickError && (
          <p className="pick-error" role="alert">
            {pickError}
          </p>
        )}

        <HistoryList
          entries={history}
          copiedHex={copiedHex}
          onSelect={(hex) => {
            setCurrentHex(hex);
            setCopyError(null);
          }}
          onClear={clear}
        />

        <InfoPanel
          hex={currentHex}
          format={format}
          copied={copiedHex !== null && copiedHex === currentHex}
          onFormatChange={setFormat}
          onCopy={copyColour}
          copyError={copyError}
        />
      </main>
    </div>
  );
}
