import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AuthContextProvider } from './contexts/AuthContext.tsx';
import { QueryProvider } from './react-query/QueryProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
    <QueryProvider>
    <App/>
    </QueryProvider>
    </AuthContextProvider>
  </StrictMode>,
)
