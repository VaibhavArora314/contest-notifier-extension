import { Link } from "react-router-dom";
import SettingsIcon from '@mui/icons-material/Settings';

const Navbar = () => {
  return (
    <div className={"w-full flex justify-between items-center px-4 mb-4 "}>
      <Link
        to="/"
        className="font-semibold text-2xl text-gray-700 dark:text-gray-300"
      >
        Contests Notifier
      </Link>
      <Link to="/settings">
        <SettingsIcon color="info"/>
      </Link>
    </div>
  );
};

export default Navbar;
