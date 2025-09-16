"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LogOut = () => {
    const router = useRouter();

  useEffect(() => {    
    // Elimina el token JWT del almacenamiento local
    localStorage.removeItem('access_token'); 

    // Redirige al usuario a la página de inicio
    router.push('../iniciar_sesion'); 
  }, []);

  return <h1>Cerrando sesión..</h1>;
};

export default LogOut;

