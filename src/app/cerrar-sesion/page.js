import LogOut from "@/app/components/LogOut";
import styles from "@/styles/page.module.css";

const CerrarSesion = () => {
  return (
    <>
      <div className={styles.container}>  
        <br /><br /> <br /> 
        <div className={styles.contenedor}>             
          <LogOut />  
        </div>
      </div>  
    </>
  );
};

export default CerrarSesion;

