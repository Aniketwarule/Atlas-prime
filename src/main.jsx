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
import Discover from './discover'
import DestinationsPage from './destinations'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/create-trip', element: <CreateTrip /> },
  { path: '/discover', element: <Discover /> },
  { path: '/destinations', element: <DestinationsPage /> },
  { path: '/view-trip/:tripId', element: <ViewTrip /> },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <ThemeProvider>
        <RouterProvider router={router} />
        <Toaster richColors position="top-right" />
      </ThemeProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
