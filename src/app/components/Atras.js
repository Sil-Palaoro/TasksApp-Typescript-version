//Componente del boton para volver atrás en el historial de navegación
'use client';
import { useRouter } from 'next/navigation';
import styles from "@/styles/page.module.css";

 
export default function Atras() {
  const router = useRouter()
 
  return (
    <button  type="button" onClick={() => router.back()} className={styles.botonatras}>
      Atrás
    </button>
  )
};