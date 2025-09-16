//Pagina de Tareas

import styles from '@/styles/Home.module.css';
import TaskList from '@/app/components/TaskList';


export default function PagTareas() {
  return (
    <>
      <div className={styles.fondo}>      
      <h1 className={styles.titulotareas}>Mis tareas</h1>     
      <div className={styles.container}>
        <TaskList />        
      </div>
      </div>            
    </>
  )
}
