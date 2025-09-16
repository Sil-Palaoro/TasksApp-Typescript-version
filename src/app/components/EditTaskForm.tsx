//Componente Para editar y guardar cambios en la tarea
"use client";
import {useState, useEffect} from 'react';
import styles from '@/styles/TaskForm.module.css';
import { useRouter } from 'next/navigation';
import axios from 'axios';


function EditTaskForm({editTask, text}) {
  const [title, setTitle] = useState(text.title);
  const [description, setDescription] = useState(text.description);
  const [tasks, setTasks] = useState([]);   //retirar?
  const router = useRouter();
  
  useEffect(() => {
    //Accede al token JWT 
    const access_token = localStorage.getItem('access_token');
    if (access_token) {

      // Configura una instancia de Axios con el token en la cabecera
      const axiosInstance = axios.create({
        baseURL: "/api/", 
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      //Trae la tarea para editar desde la BD
      axiosInstance
        .get(`/tasks/${text.id}/`)
        .then((response) => {
          setTitle(response.data.title);
          setDescription(response.data.description);
        })
        .catch((error) => console.error(error));        

    } else {
      router.push('/iniciar_sesion');
    }
    }, []);  

    //Maneja la edición de la tarea
    const handleSubmit = (e) => {
      e.preventDefault();

      //Accede al token JWT
      const access_token = localStorage.getItem('access_token');
      if (access_token) {

        // Configura una instancia de Axios con el token en la cabecera
        const axiosInstance = axios.create({
          baseURL: "/api/",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        //Edita la tarea en la BD con PATCH
        axiosInstance
          .patch(`/tasks/${text.id}/`, { title, description })
          .then((response) => {
            // Chequeamos que la información llegue desde el back-end
            console.log(response.data);

            // Llama a la función editTask para editar la tarea
            editTask( title, description, text.id);
          })
          .catch((error) => console.error(error));
      } else {
        router.push('/iniciar_sesion');
      }
    };
    
  //Formulario de edición de la tarea
  return <form onSubmit={handleSubmit}>
   <input className={styles.taskInput}
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
      className={styles.taskInput }
        type="text"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    <button className={styles.taskBtn} type="submit">Guardar</button>
  </form>;
}

export default EditTaskForm
