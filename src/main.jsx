import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ThemeProvider } from './context/ThemeContext'
import CreateTrip from './create-trip'
import ViewTrip from './view-trip/[tripId]'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/create-trip', element: <CreateTrip /> },
  { path: '/view-trip/:tripId', element: <ViewTrip /> },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <ThemeProvider>
        <RouterProvider router={router}>
          <Toaster />
          <App />
        </RouterProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
