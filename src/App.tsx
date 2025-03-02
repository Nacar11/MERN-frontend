import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Home from './pages/HomePage'
import Navbar from './components/Navbar'
import ErrorPage from './pages/ErrorPage'


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
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;