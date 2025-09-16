/*Página de registro de usuario*/
"use client";
import { useState } from "react";
import styles from "@/styles/page.module.css";
import axios from 'axios';

function Registro() {
  // Estados para almacenar los datos del formulario y mensajes de error 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  
  const handleRegister = async () => {
    try {
          /*Validaciones de los inputs*/
        if (username.length > 15 || !/^[a-zA-Z0-9]+$/.test(username)) {
          setErrorMessage(
            "El nombre de usuario debe tener menos de 15 caracteres y contener solo letras y números."
          );
        } else if (
          password.length < 6 ||
          password.length > 12 ||
          !/\d/.test(password) ||
          !/[A-Z]/.test(password) ||
          !/[a-z]/.test(password)
        ) {
          setErrorMessage(
            "La contraseña debe tener entre 6 y 12 caracteres y contener números, mayúsculas y minúsculas."
          );
        } else if (password !== password2) {
          setErrorMessage("Las contraseñas no coinciden.");
        } else {
          
          const response = await axios.post('/api/register/', {             
            username,
            password           ,
          });

          // Si la solicitud se realiza con éxito muestra un mensaje de éxito.
          alert("El registro fue exitoso!");

          setErrorMessage("");          
          setUsername("");
          setPassword("");
          setPassword2("");

          // Redirige a la página de Inicio de sesión
          window.location.href = "/iniciar_sesion"; }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.detail || "Error en el registro.");
      } else {
        setErrorMessage("Error en la solicitud.");
      }
    }
  };

  return (
    //Formulario de Registro de usuario
    <div className={styles.container}>
      <div className={styles.contenedor}>
        <br />
        <br />
        <br />
        <h1>Registro</h1>

        <p>Por favor complete a continuación el siguiente formulario:</p>
        <div>
          <br />
          <h5>Ingrese su nombre de usuario</h5>
          <input className={styles.input}  
            type="text"
            maxLength="15"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <br />
          <h5>Ingrese la contraseña</h5>
          <input className={styles.input}            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <h5>Repita la contraseña</h5>
          <input className={styles.input}  
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
          <br />
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <br />
          <button onClick={handleRegister} className={styles.boton}>Registrarme</button>
          <br />
        </div>
      </div>
    </div>
  );
}

export default Registro;

