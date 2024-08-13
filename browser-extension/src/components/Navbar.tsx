import { Link } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Navbar = () => {
  return (
    <div className={"w-full flex justify-between items-center px-4 mb-4 "}>
      <Link
        to="/"
        className="font-semibold text-2xl text-gray-700 dark:text-gray-300"
      >
        Contests Notifier
      </Link>
      <span className="flex justify-center items-center gap-2">
        <Link to="/alarms">
          <NotificationsIcon color="info" />
        </Link>

        <Link to="/settings">
          <SettingsIcon color="info" />
        </Link>
      </span>
    </div>
  );
};

export default Navbar;
