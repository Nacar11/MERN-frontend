import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { WorkoutsContextProvider } from './contexts/WorkoutsContext.tsx';
import { AuthContextProvider } from './contexts/AuthContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
      <WorkoutsContextProvider>
    <App />
    </WorkoutsContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
