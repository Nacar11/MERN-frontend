import { NavLink } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"
import { useLogout } from '../hooks/useLogout'


const Navbar = () => {
  const { user } = useAuthContext()

  const { logout } = useLogout()

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="w-full px-8 text-gray-700 bg-white shadow-sm">
      <div className="container flex flex-col md:flex-row items-center justify-between py-5 mx-auto max-w-7xl">
        <div className="flex items-center w-full justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center mb-5 md:mb-0">
            <span className="text-green-600 text-xl font-black select-none">
              Social
            </span>
            <span className="text-xl font-black text-gray-900 select-none">
              React
            </span>
          </NavLink>
  
          {/* Navigation and profile */}
          <div className="flex items-center justify-between w-full ml-8">
            <nav
              className={`flex flex-wrap items-center ${
                user ? "md:border-l md:pl-8" : "ml-auto"
              }`}
            >
              {user ? (
                <>
                  <NavLink
                    to="/"
                    end
                    className="mr-5 font-medium text-gray-600 hover:text-gray-900"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/workouts"
                    className="mr-5 font-medium text-gray-600 hover:text-gray-900"
                  >
                    Workout
                  </NavLink>
                  <NavLink
                    to="/about"
                    className="mr-5 font-medium text-gray-600 hover:text-gray-900"
                  >
                    About
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="mr-5 font-medium text-gray-600 hover:text-gray-900"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className="mr-5 font-medium text-gray-600 hover:text-gray-900"
                  >
                    Signup
                  </NavLink>
                </>
              )}
            </nav>  
            {user && (
              <div className="flex items-center space-x-4 ml-auto">
                <NavLink to="/profile" className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg shadow hover:bg-gray-200">
                  <img
                    src="/assets/user.jpg"
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-800">
                    {user.name || "Profile"}
                  </span>
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar