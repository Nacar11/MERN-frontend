import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import './App.css'

// pages & components
import HomePage from './pages/HomePage'
import Navbar from './components/specific/Navbar'
import ErrorPage from './pages/ErrorPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'


function App() {
  const { user } = useAuthContext()
  return (
    <div className="min-h-screen bg-gray-50">
      <BrowserRouter>
        <Navbar />
        <div className="w-full">
          <Routes>
            <Route 
              path="/"
              element={user ? <HomePage /> : <Navigate to="/login"/>}
            />
            <Route 
              path="/login" 
              element={!user ? <LoginPage/> : <Navigate to="/"/>} 
            />
            <Route 
              path="/signup" 
              element={!user ? <SignupPage/> : <Navigate to="/"/>} 
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