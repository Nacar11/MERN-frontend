import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import './App.css'

// pages & components
import HomePage from './pages/HomePage'
import Navbar from './components/specific/Navbar'
import ErrorPage from './pages/ErrorPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import AboutPage from './pages/AboutPage'
import WelcomePage from './pages/WelcomePage'
import ProfilePage from './pages/ProfilePage'
import SearchPage from './pages/SearchPage'


function App() {
  const { user } = useAuthContext()
  const isNewUser = localStorage.getItem('isNewUser') === 'true'

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-300 pb-20 md:pb-0">
      <BrowserRouter>
        <Navbar />
        <div className="w-full">
          <Routes>
            <Route
              path="/"
              element={user ? <HomePage /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <LoginPage /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <SignupPage /> : (isNewUser ? <Navigate to="/welcome" /> : <Navigate to="/" />)}
            />
            <Route
              path="/welcome"
              element={user && isNewUser ? <WelcomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/about"
              element={<AboutPage />}
            />
            <Route
              path="/profile/:userId"
              element={user ? <ProfilePage /> : <Navigate to="/login" />}
            />
            <Route
              path="/search"
              element={user ? <SearchPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/*"
              element={<ErrorPage />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;