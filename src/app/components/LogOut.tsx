"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LogOut = () => {
    const router = useRouter();
    const removeJWTToken = () => localStorage.removeItem('access_token'); 
    const redirectToLogin = () => router.push('../iniciar_sesion'); 

  useEffect(() => {    
    removeJWTToken();
    redirectToLogin();
  }, []);

  return <h1>Cerrando sesión..</h1>;
};

export default LogOut;

