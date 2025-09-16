//Componente de la Barra de navegación
"use client";
import Link from 'next/link';
import "@/styles/navbar.css";
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';



function BarraNavAppTareas () {
  const [isClient, setIsClient] = useState(false)
  const pathname = usePathname()
 
  useEffect(() => {
    setIsClient(true)
  }, [])
 
  return (
    <>
    {isClient == true ?
    <nav className="navigation">
      <Link href="/" className="brand-name">
        SGP Tareas
      </Link>
      
      {/*Links del menu de navegacion*/}
      <div
        className="navigation-menu">
        <ul>
          <li>
          {pathname !== '/' ? (<Link href="/">Home</Link>) : null}
          </li>          
          <li>
          {pathname !== '/iniciar_sesion' && pathname !== '/tareas'  ? (<Link href="/iniciar_sesion">Iniciar sesión</Link>) : null}
          </li>
          <li>
          {pathname !== '/registro' && pathname !== '/tareas' ? (<Link href="/registro">Registrarse</Link>) : null}
          </li>
          <li>
          {pathname !== '/' && pathname !== '/registro' && pathname !== '/iniciar_sesion' ? (<Link href="/cerrar-sesion">Cerrar sesión</Link>) : null}
          </li>
         </ul>
      </div>
    </nav> :
    " "}
    </>
  );  
}

export default BarraNavAppTareas;
