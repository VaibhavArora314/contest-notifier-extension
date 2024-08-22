import "./App.css";
import axios from "axios";
import ContestList from "./components/ContestList";
import SettingsMenu from "./components/SettingsMenu";
import useTheme from "./hooks/useTheme";
import Credits from "./components/Credits";
import AlarmList from "./components/Alarms";
import useContests from "./hooks/useContests";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// axios.defaults.baseURL = "http://localhost:3000/api";
axios.defaults.baseURL = "https://cp-list.vercel.app/api";

function App() {
  const { loading, error, contests, platforms, setPlatforms } = useContests();
  const { theme, setDarkMode } = useTheme();

  return (
    <>
      <div className="min-h-screen px-4 py-6 bg-gray-100 dark:bg-gray-800 flex flex-col justify-between items-center">
        <div className="w-full">
          <Navbar />
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
            <Route path="/alarms" element={<AlarmList />} />
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
        <Credits />
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
