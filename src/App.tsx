import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Home from './pages/HomePage'
import Navbar from './components/Navbar'
import ErrorPage from './pages/ErrorPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={<Home />}
            />
            <Route 
              path="/login" 
              element={<LoginPage />} 
            />
            <Route 
              path="/signup" 
              element={<SignupPage />} 
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