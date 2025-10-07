import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";
import UserDropdown from "./UserDropdown";
import PostFormModal from "./PostFormModal";
import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const handleLogout = () => logout();
  const openPostModal = () => setIsPostModalOpen(true);
  const closePostModal = () => setIsPostModalOpen(false);

  return (
    <>
    <header className="w-full px-4 text-gray-700 bg-white shadow-sm">
      <div className="flex items-center justify-between py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <img 
            src="/assets/logo.svg" 
            alt="Social Logo" 
            className="h-8 w-8 md:h-10 md:w-10"
          />
          <span className="text-green-600 text-xl font-black select-none md:text-2xl">
            Social
          </span>
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          {user ? (
            <>
              <NavLink
                to="/"
                end
                className="font-medium text-gray-600 hover:text-gray-900"
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className="font-medium text-gray-600 hover:text-gray-900"
              >
                About
              </NavLink>
              <span 
                onClick={openPostModal}
                className="font-medium text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                Create Post
              </span>
              <UserDropdown />
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="font-medium text-gray-600 hover:text-gray-900"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="font-medium text-gray-600 hover:text-gray-900"
              >
                Signup
              </NavLink>
            </>
          )}
        </nav>

      </div>
      
      {/* Post Form Modal */}
      <PostFormModal isOpen={isPostModalOpen} onClose={closePostModal} />
    </header>

    {/* Mobile Bottom Navigation */}
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex items-center justify-around h-16 max-w-7xl mx-auto px-2">
        {user ? (
          <>
            {/* Home */}
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  isActive ? 'text-green-600' : 'text-gray-600'
                }`
              }
            >
              <HomeIcon fontSize="small" />
              <span className="text-[10px] mt-0.5">Home</span>
            </NavLink>

            {/* About */}
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  isActive ? 'text-green-600' : 'text-gray-600'
                }`
              }
            >
              <InfoIcon fontSize="small" />
              <span className="text-[10px] mt-0.5">About</span>
            </NavLink>

            {/* Create Post */}
            <button
              onClick={openPostModal}
              className="flex flex-col items-center justify-center flex-1 h-full text-gray-600 hover:text-green-600 transition-colors"
            >
              <AddCircleIcon fontSize="medium" className="text-green-600" />
              <span className="text-[10px] mt-0.5">Post</span>
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex flex-col items-center justify-center flex-1 h-full text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogoutIcon fontSize="small" />
              <span className="text-[10px] mt-0.5">Logout</span>
            </button>
          </>
        ) : (
          <>
            {/* Login */}
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  isActive ? 'text-green-600' : 'text-gray-600'
                }`
              }
            >
              <LoginIcon fontSize="small" />
              <span className="text-[10px] mt-0.5">Login</span>
            </NavLink>

            {/* Signup */}
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  isActive ? 'text-green-600' : 'text-gray-600'
                }`
              }
            >
              <PersonAddIcon fontSize="small" />
              <span className="text-[10px] mt-0.5">Signup</span>
            </NavLink>
          </>
        )}
      </div>
    </nav>
    </>
  );
};

export default Navbar;
