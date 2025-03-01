import './App.css'
import { Layout } from './LayoutArea/Layout/Layout'
// import axios from 'axios';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Manejador global de errores de red
    const handleError = (error: any) => {
      if (error.response?.status === 401) {
        // Manejar error de autenticación
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Redirigir a login si es necesario
      }
      console.error('Network Error:', error);
    };

    window.addEventListener('unhandledrejection', handleError);
    return () => window.removeEventListener('unhandledrejection', handleError);
  }, []);

  return (
    <Layout />
  )
}

export default App
