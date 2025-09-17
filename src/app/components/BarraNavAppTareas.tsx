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

  function PathNameNotHome() {
    return pathname !== '/'
  }

  function PathNameNotIniciarSesion() {
    return pathname !== '/iniciar_sesion'
  }

  function PathNameNotTareas() {
    return pathname !== '/tareas'
  }

  function PathNameNotRegistro() {
    return pathname !== '/registro'
  }
 
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
          {PathNameNotHome() ? (<Link href="/">Home</Link>) : null}
          </li>          
          <li>
          {PathNameNotIniciarSesion() && PathNameNotTareas()  ? (<Link href="/iniciar_sesion">Iniciar sesión</Link>) : null}
          </li>
          <li>
          {PathNameNotRegistro() && PathNameNotTareas() ? (<Link href="/registro">Registrarse</Link>) : null}
          </li>
          <li>
          {PathNameNotHome() && PathNameNotRegistro() && PathNameNotIniciarSesion() ? (<Link href="/cerrar-sesion">Cerrar sesión</Link>) : null}
          </li>
         </ul>
      </div>
    </nav> :
    " "}
    </>
  );  
}

export default BarraNavAppTareas;

