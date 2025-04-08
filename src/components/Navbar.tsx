import { NavLink } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"

const Navbar = () => {
  const { user } = useAuthContext()

  return (
    <header className="w-full px-8 text-gray-700 bg-white shadow-sm">
      <div className="container flex flex-col md:flex-row items-center justify-between py-5 mx-auto max-w-7xl">
        <div className="flex items-center w-full">
          {/* Logo always on the left */}
          <NavLink to="/" className="flex items-center mb-5 md:mb-0">
            <span className="text-green-600 text-xl font-black select-none">
              TypeSafety
            </span>
            <span className="text-xl font-black text-gray-900 select-none">
              React
            </span>
          </NavLink>

          {/* Nav links conditionally styled based on auth */}
          <nav
            className={`flex flex-wrap items-center ${
              user
                ? "ml-8 md:border-l md:pl-8"
                : "ml-auto" // pushes nav to the right if not logged in
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
        </div>
      </div>
    </header>
  )
}

export default Navbar