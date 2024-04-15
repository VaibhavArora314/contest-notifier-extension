import React from "react";
import { PLATFORM } from "../types/contest";

type Props = {
  theme: string;
  platforms: string[];
  setPlatforms: React.Dispatch<React.SetStateAction<string[]>>;
  setDarkMode: (val: boolean) => void;
};

const SettingsMenu = ({
  theme,
  setDarkMode,
  platforms,
  setPlatforms,
}: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const isDarkMode = event.target.value === "dark";
    setDarkMode(isDarkMode);
  };

  const handlePlatformChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const platform = event.target.value;
    if (platforms.includes(platform)) {
      setPlatforms((p) => p.filter((p) => p !== platform));
    } else {
      setPlatforms((p) => [...p, platform]);
    }
  };

  return (
    <div className="p-4 pt-2 w-full">
      <div className="p-4 pt-0 w-full">
        <div className="flex flex-row justify-between w-full items-center mb-4">
          <label
            htmlFor="themeSelect"
            className="mr-2 text-xl text-gray-700 dark:text-gray-300"
          >
            Choose theme:
          </label>
          <select
            id="themeSelect"
            onChange={handleChange}
            className="border text-lg p-2 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
            value={theme}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div className="flex flex-col justify-between w-full items-start mb-4 gap-2">
          <label className="mr-2 text-xl text-gray-700 dark:text-gray-300">
            Select platforms:
          </label>
          <div className="flex flex-col w-full gap-1">
            <label className="mr-2 text-lg flex flex-row w-full items-center justify-between dark:text-gray-300">
              {PLATFORM.CODEFORCES}
              <input
                type="checkbox"
                value={PLATFORM.CODEFORCES}
                checked={platforms.includes(PLATFORM.CODEFORCES)}
                onChange={handlePlatformChange}
                className="mr-1"
              />
            </label>
            <label className="mr-2 text-lg flex flex-row w-full items-center justify-between dark:text-gray-300">
              {PLATFORM.CODECHEF}
              <input
                type="checkbox"
                value={PLATFORM.CODECHEF}
                checked={platforms.includes(PLATFORM.CODECHEF)}
                onChange={handlePlatformChange}
                className="mr-1"
              />
            </label>
            <label className="mr-2 text-lg flex flex-row w-full items-center justify-between dark:text-gray-300">
              {PLATFORM.LEETCODE}
              <input
                type="checkbox"
                value={PLATFORM.LEETCODE}
                checked={platforms.includes(PLATFORM.LEETCODE)}
                onChange={handlePlatformChange}
                className="mr-1"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsMenu;
