import type { Theme } from "../hooks/useTheme";
import { MoonIcon, SunIcon } from "./icons";

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  return (
    <header className="app-header">
      <div className="brand">
        <span className="brand__mark" aria-hidden="true">
          <img className="brand__icon" src="./icons/header.png" alt="" />
        </span>
        <div>
          <h1 className="brand__name">Extract</h1>
          <p className="brand__tagline">By Shaarav4795</p>
        </div>
      </div>

      <ThemeToggle isDark={theme === "dark"} onToggle={onToggleTheme} />
    </header>
  );
}

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-label={label}
      title={label}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
