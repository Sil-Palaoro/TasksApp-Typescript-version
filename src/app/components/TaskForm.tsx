//Componente del formulario para armar cada tarea
"use client";
import {useEffect, useState}  from "react";
import styles from '@/styles/TaskForm.module.css';
import { useRouter } from 'next/navigation';
import axios from 'axios';


function TaskForm({ addTask, username }) {
  const [tasks, setTasks] = useState({title: '', description: ''});  
  const router = useRouter();
  
  useEffect(() => {
    // Recupera el token JWT almacenado en localStorage
    const access_token = localStorage.getItem('access_token');
    
    // Verifica si el token está presente
    if (access_token) {
      // Configura una instancia de Axios con el token en la cabecera
      const axiosInstance = axios.create({
        baseURL: "/api/",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      
      //Trae las tareas anteriores desde la BD
      axiosInstance
        .get("tasks/")
        .then((response) => {
          setTasks({...tasks, ...response.data});
      })
        .catch((error) => console.error(error));
    } else {
      // Si el token JWT no está presente en localStorage, redirige a la página de inicio de sesión
      router.push('/iniciar_sesion'); 
     }
  }, []);
  

  const handleChange = (e) => {
    setTasks({ ...tasks, [e.target.name]: e.target.value });
  };

  //Maneja la adición de nuevas tareas
  const handleSubmit = (e) => {    
    e.preventDefault();
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      const axiosInstance = axios.create({
        baseURL: "/api/",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const  taskData = {...tasks,
      user: username}; 

      //Agrega una nueva tarea en la BD con POST
      axiosInstance
        .post('/tasks/', taskData)
        .then((response) => {          
          
          // Llama a la función addTask para agregar la tarea      
          addTask(response.data);
          setTasks({title: '', description: ''});          
        })
        .catch((error) => console.error(error));
    } else {
      router.push('/iniciar_sesion');
    }
  };
  
  //Formulario para agregar una nueva tarea
  return <form className = {styles.taskForm} onSubmit={handleSubmit}>
    <input
      className={styles.taskInput}
        type="text"
        name="title"
        placeholder="Título"
        value={tasks.title}
        onChange={handleChange}
        required
      />
     <input
      className={styles.taskInput}
        type="text"
        name="description"
        placeholder="Descripción"
        value={tasks.description}
        onChange={handleChange}
      /> 
    <button className={styles.taskBtn} type="submit">Agregar</button>
    
  </form>;
}

export default TaskForm;



