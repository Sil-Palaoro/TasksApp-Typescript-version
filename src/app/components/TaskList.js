"use client";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import EditTaskForm from "./EditTaskForm";
import styles from "@/styles/TaskList.module.css";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrash2Fill } from "react-icons/bs";
import { RiRadioButtonFill } from "react-icons/ri";
import axios from 'axios';
import {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';


//Lista de tareas
function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all"); // Estado para el filtro seleccionado
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
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
          'Content-Type': 'application/json',
        },
      
      });
      
      //Trae las tareas desde la BD
      axiosInstance
        .get("/tasks/")
        .then((response) => setTasks(response.data))
        .catch((error) => console.error(error));       

    } else {
      //Si el token JWT no está presente en localStorage, redirige a la página de inicio de sesión
      router.push('/iniciar_sesion'); 
    }
  }, []);  
  
  //Función para agregar una nueva tarea
  const addTask = (task) => {    
    setTasks([
      ...tasks,
      {        
        id: task.id,
        creation_date: task.creation_date,
        title: task.title,
        description: task.description,
        completed: task.completed,
        isEditing: task.isEditing,
      },      
    ]);    
  };

  //Función para marcar una tarea como completada o no
  const taskCompleted = (id) => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
        const axiosInstance = axios.create({
            baseURL: "/api/",
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        axiosInstance
            .post(`/tasks/${id}/task_completed/`)
            .then((response) => {
              // Actualizar la lista de tareas en el frontend después de recibir la respuesta del servidor
              const updatedTasks = tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
              );
              setTasks(updatedTasks);
        })
            .catch((error) => console.error(error));
    } else {
        router.push('/iniciar_sesion');
    }
};


  //Función para eliminar una tarea
  const delTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };


  //Función para editar una tarea
  const editTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isEditing: !task.isEditing } : task
      )
    );
  };
  

  const editText = (title, description, id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title,
              description,
              isEditing: !task.isEditing,
            }
          : task
      )
    );
  };

  return (
    <div className={styles.container}>      
      {/*Formulario para agregar una nueva tarea*/}
      <TaskForm addTask={addTask} />

      <div >
        {/*Barra de busqueda*/}
        <input className={styles.taskInput} name="search" type="text" placeholder="Buscar tareas..." 
        value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        
        {/*Botón para seleccionar filtro de búsqueda*/}
        <select className={styles.taskBtn} name="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Todas las tareas</option>
          <option value="filtrocompleted">Realizadas</option>
          <option value="filtroincomplete">Pendientes</option>
        </select>
      </div>
      <br/>
       
       
      {/*Lista de tareas*/}
      <div className={styles.descripcionbox}>      
      
      {console.log("Respuesta del servidor:", tasks)}

      {/*Muestra las tareas primero aplicando el filtro de búsqueda*/}
      {tasks.filter((task) => {
    if (filter === "filtrocompleted") {
      return task.completed;
    } else if (filter === "filtroincomplete") {
      return !task.completed;
    }
    return true;
  })
  .filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())    
    ).map((task, index) =>
        //Muestra las tareas dependiendo si se está editando o no
        task.isEditing ? (
          <EditTaskForm editTask={editText} text={task} />
        ) : (
          
          <TaskItem
            text={task}
            key={index}
            taskCompleted={taskCompleted}
            delTask={delTask}
            editTask={editTask}
          />
        )
      )}
      
      </div>
    </div>
  );
}

export default TaskList;