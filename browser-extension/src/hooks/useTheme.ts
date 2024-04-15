import { useEffect, useState } from "react";
import { MODE } from "../types/theme";

const THEME_KEY = "theme";

const useTheme = () => {
  const [theme, setTheme] = useState<MODE>(localStorage.getItem(THEME_KEY) as MODE || MODE.light);

  useEffect(() => {
    if (theme == MODE.dark) {
      document.documentElement.classList.add(MODE.dark);
    } else {
      document.documentElement.classList.remove(MODE.dark);
    }

    localStorage.setItem(THEME_KEY,theme);
  }, [theme]);

  const setDarkMode = (val:boolean) => {
    if (val) setTheme(MODE.dark);
    else setTheme(MODE.light);
  }

  return { theme, setDarkMode };
};

export default useTheme;