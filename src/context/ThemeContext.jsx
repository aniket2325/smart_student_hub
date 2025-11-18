import React, { createContext, useContext, useState, useEffect } from "react";

// Create Theme Context
const ThemeContext = createContext();

// Custom hook to use theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

// Theme Provider Component
export default function ThemeProvider({ children }) {
  // Initialize theme state (default: light mode)
  const [isDark, setIsDark] = useState(false);

  // Load theme preference from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
    }
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDark((prev) => {
      const newTheme = !prev;
      // Save theme preference to localStorage
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {/* Apply dark class to root div based on isDark state */}
      <div className={isDark ? "dark" : ""}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}