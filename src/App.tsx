import { Header } from "./components/Header";
import { HistoryList } from "./components/HistoryList";
import { InfoPanel } from "./components/InfoPanel";
import { PipetteIcon } from "./components/icons";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app">
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main className="app__body">
        <button type="button" className="pick-button">
          <PipetteIcon className="pick-button__icon" />
          <span>Pick a colour</span>
        </button>

        <HistoryList />

        <InfoPanel />
      </main>
    </div>
  );
}
