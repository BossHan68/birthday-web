import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("anniversary_theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("anniversary_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="theme-toggle-wrapper" aria-label="Theme Switcher">
      <button
        type="button"
        className="theme-toggle-btn icon-only"
        onClick={toggleTheme}
        title={theme === "light" ? "โหมดกลางคืน" : "โหมดกลางวัน"}
        aria-label="Toggle Dark Mode"
      >
        <span className="theme-icon">{theme === "light" ? "🌙" : "☀️"}</span>
      </button>
    </div>
  );
}
