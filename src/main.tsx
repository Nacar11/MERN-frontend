import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { WorkoutsContextProvider } from './contexts/WorkoutsContext.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <WorkoutsContextProvider>
    <App />
    </WorkoutsContextProvider>
  </StrictMode>,
)
