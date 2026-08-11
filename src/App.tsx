import { useCallback, useRef, useState } from "react";
import { Header } from "./components/Header";
import { HistoryList } from "./components/HistoryList";
import { InfoPanel } from "./components/InfoPanel";
import { PipetteIcon } from "./components/icons";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  const { theme, toggleTheme } = useTheme();

  const [currentHex, setCurrentHex] = useState<string | null>(null);
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
        await navigator.clipboard.writeText(hex);
        flashCopied(hex);
      } catch {
        setCopyError("Unable to copy the colour.");
      }
    },
    [flashCopied],
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
      setCurrentHex(hex);
      setCopyError(null);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setPickError("Unable to pick a colour right now.");
    }
  }, []);

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

        <HistoryList />

        <InfoPanel
          hex={currentHex}
          copied={copiedHex !== null && copiedHex === currentHex}
          onCopy={copyColour}
          copyError={copyError}
        />
      </main>
    </div>
  );
}
