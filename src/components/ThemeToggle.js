import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import IconButton from "./shared/IconButton";

const ThemeToggle = () => {
  const [themeState, setThemeState] = useState(false);

  useEffect(() => {
    const getTheme = localStorage.getItem("Theme");
    if (getTheme === "dark") {
      setThemeState(true);
    }
  }, []);

  useEffect(() => {
    if (themeState) {
      localStorage.setItem("Theme", "dark");
      document.body.classList.add("dark-mode");
    } else {
      localStorage.setItem("Theme", "light");
      document.body.classList.remove("dark-mode");
    }
  }, [themeState]);

  return (
    <IconButton
      icon={themeState ? faSun : faMoon}
      iconsize="2x"
      className="icon-button"
      onClick={() => setThemeState(!themeState)}
    >
      {themeState ? "Light Mode" : "Dark Mode"}
    </IconButton>
  );
};

export default ThemeToggle;
