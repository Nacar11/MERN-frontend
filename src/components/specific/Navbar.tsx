import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";
import UserDropdown from "./UserDropdown";
import PostFormModal from "./PostFormModal";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const handleLogout = () => logout();
  const openPostModal = () => setIsPostModalOpen(true);
  const closePostModal = () => setIsPostModalOpen(false);

  return (
    <header className="w-full px-4 text-gray-700 bg-white shadow-sm">
      <div className="flex items-center justify-between py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <span className="text-green-600 text-xl font-black select-none md:text-2xl">
            Social
          </span>
          <span className="text-xl font-black text-gray-900 select-none md:text-2xl">
            React
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

        {/* Hamburger Icon (Mobile) */}
        <button
          className="md:hidden focus:outline-none bg-green-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden sticky top-0 z-[1] flex w-full flex-wrap items-center justify-between border-b border-gray-100 bg-background py-[2em] uppercase text-text-primary backdrop-blur-[100px]"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="flex flex-col gap-y-4 items-center basis-full mt-4">
            {user ? (
              <>
                <NavLink
                  className="hover:text-gray-700"
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </NavLink>
                <NavLink
                  className="hover:text-gray-700"
                  to="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </NavLink>
                <span
                  className="hover:text-gray-700 cursor-pointer"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openPostModal();
                  }}
                >
                  Create Post
                </span>
                <span
                  className="hover:text-gray-700 cursor-pointer"
                  onClick={() => handleLogout()}
                >
                  Logout
                </span>
              </>
            ) : (
              <>
                <NavLink to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Signup
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Post Form Modal */}
      <PostFormModal isOpen={isPostModalOpen} onClose={closePostModal} />
    </header>
  );
};

export default Navbar;
