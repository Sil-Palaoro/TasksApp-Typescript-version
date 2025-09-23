/*Página de Login*/

"use client";
import styles from "@/styles/page.module.css";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';


function Inicio_sesion() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  
  const apiUrl: string = '/api/login'; 
  const redirectToTareas = () => router.push('../tareas/'); 


  const handleIniciarSesion = async () => {
    try {
      const postResponse = await axios.post(apiUrl, {username, password});

      if (postResponse.status === 200) {
        const accessToken = postResponse.data.access;
        localStorage.setItem('access_token', accessToken);
        redirectToTareas();    
      }     
    } catch (error: unknown) {
      if (axios.isAxiosError<{ message: string }>(error)) {
        alert(error.response?.data?.message || "Error en la solicitud.");
      } else if (error instanceof Error){
        alert(error.message);
      } else {
        alert("Error inesperado.");
      }
    }
  };

  return (
    //Formulario de inicio de sesión
    <>
      <div className={styles.container}>      
        <br /><br /><br />
        <div className={styles.contenedor}>
          <h1>Iniciar sesión</h1>
          <br />
          <p>A continuación ingrese su usuario y contraseña:</p>
          <br />
          <form>
            <h5>Ingrese su nombre de usuario</h5>
            <input className={styles.input}
              value={username}
              placeholder="Usuario"
              id="user"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <br />
            <br />
            <h5>Ingrese la contraseña</h5>
            <input className={styles.input}
            placeholder="Contraseña"
              value={password}
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            <br />
            <button className={styles.boton} onClick={handleIniciarSesion}>
              Iniciar
            </button>{" "}

          </form>
        </div>
      </div>
    </>
  );
}

export default Inicio_sesion;
