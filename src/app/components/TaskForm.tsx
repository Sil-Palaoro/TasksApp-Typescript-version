//Componente del formulario para armar cada tarea
"use client";
import {useEffect, useState}  from "react";
import styles from "@/styles/TaskForm.module.css";
import { useRouter } from "next/navigation";
import axios from "axios";


interface Task {
    id?: string;
    title: string;
    description: string;
    completed?: boolean;
    creation_date?: string;
    isEditing?: boolean;
    username?: string;
  }

interface TaskFormProps {
  addTask: (task: Task) => void;
  username: string;
}


function TaskForm({ addTask, username }: TaskFormProps) {
  const [tasks, setTasks] = useState<Pick<Task, "title" | "description">>({title:"", description: ""});
  const router = useRouter();

  const getAccessToken = (): string | null => localStorage.getItem('access_token');
  
  function createAxiosInstance(token: string) {    
    const axiosInstance = axios.create({
          baseURL: "/api/",
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          });

      return axiosInstance;
  };

  const getPreviousTasks = async (axiosInstance: axios.AxiosInstance) => {
    try {    
      axiosInstance
        .get("/tasks/")
        .then((response) => {
          setTasks({...tasks, ...response.data})
        });
    } catch {((error: Error) => console.error(error))};   
  };

  const postNewTask = async (axiosInstance: axios.AxiosInstance) => {
    const  taskData = {
      ...tasks,
      user: username
    }; 

    try {
      axiosInstance
        .post('/tasks/', taskData)
        .then((response) => {               
          // Llama a la función addTask para agregar la tarea      
          addTask(response.data);
          setTasks({title: '', description: ''});          
        });
      } catch {((error: Error) => console.error(error))};
  };


  const redirectToLogin = () => router.push('/iniciar_sesion'); 

  
  useEffect(() => {
    const accessToken = getAccessToken(); 
    
    if (accessToken) {
      const axiosInstance = createAxiosInstance(accessToken);
      getPreviousTasks(axiosInstance);          
    } else {
        redirectToLogin();
    }

  }, []);
  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTasks({ 
      ...tasks, 
      [event.target.name]: event.target.value 
    });
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {    
    event.preventDefault();
    const accessToken = getAccessToken(); 

    if (accessToken) {
      const axiosInstance = createAxiosInstance(accessToken);   
      postNewTask(axiosInstance);   
    } else {
      redirectToLogin();
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



//postNewTask previo

      // const  taskData = {...tasks,
      // user: username}; 

      // //Agrega una nueva tarea en la BD con POST
      // axiosInstance
      //   .post('/tasks/', taskData)
      //   .then((response) => {          
          
      //     // Llama a la función addTask para agregar la tarea      
      //     addTask(response.data);
      //     setTasks({title: '', description: ''});          
      //   })
      //   .catch((error) => console.error(error));

