import "./App.css";
import axios from "axios";
import ContestList from "./components/ContestList";
import SettingsMenu from "./components/SettingsMenu";
import useTheme from "./hooks/useTheme";
import Credits from "./components/Credits";
import useContests from "./hooks/useContests";
import { Link, Route, Routes } from "react-router-dom";

// axios.defaults.baseURL = "http://localhost:3000/api";
axios.defaults.baseURL = "https://cp-list.vercel.app/api";

function App() {
  const { loading, error, contests, platforms, setPlatforms } = useContests();
  const { theme, setDarkMode } = useTheme();

  return (
    <div className="min-h-screen px-4 py-6 bg-gray-100 dark:bg-gray-800 flex flex-col justify-between">
      <div className="container mx-auto h-full">
        <div className="flex flex-col items-center justify-between">
          <div
            className={"w-full flex justify-between items-center px-4 mb-4 "}
          >
            <Link to="/" className="font-semibold text-2xl text-gray-700 dark:text-gray-300">
              Contests Notifier
            </Link>
            <Link to="/settings">
            <img
              className={`w-5 h-5 cursor-pointer ${
                theme === "dark" ? "filter invert" : ""
                }`}
                src="images/setting.png"
                alt="settings"
                />
              </Link>
          </div>

          <Routes>
            <Route
              path="/settings"
              element={
                <SettingsMenu
                  theme={theme}
                  setDarkMode={setDarkMode}
                  platforms={platforms}
                  setPlatforms={setPlatforms}
                />
              }
            />
            <Route
              path="*"
              element={
                <ContestList
                  loading={loading}
                  error={error}
                  contests={contests}
                />
              }
            />
          </Routes>
        </div>
      </div>
      <Credits />
    </div>
  );
}

export default App;
