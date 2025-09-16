/*Página de Login*/

"use client";
import styles from "@/styles/page.module.css";
import { useState } from 'react';
import axios from 'axios';


function Inicio_sesion() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  // Endpoint para obtener el token JWT
  const apiUrl = '/api/login'; 

  const handleIniciarSesion = async () => {
    try {
      // Realiza una solicitud POST para enviar las credenciales y obtener el token
      const response = await axios.post(apiUrl, {
        username,
        password,
      });

      // Verifica si la solicitud fue exitosa
      if (response.status === 200) {
        // Accede al Token JWT en response.data.access y lo guarda en la variable access_token  
        const access_token = response.data.access;            

        // Almacena el token en localStorage 
        localStorage.setItem('access_token', access_token);        

        // Redirige al usuario a la página de tareas
      window.location.href = "/tareas/";

      //Si la solicitud no fue exitosa da un mensaje de error
      } else {
        alert("Error en el inicio de sesión.");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "Error en el inicio de sesión.");
      } else {
        alert("Error en la solicitud.");
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
        <div>
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
         
        </div>
      </div>
      </div>
    </>
  );
}

export default Inicio_sesion;
