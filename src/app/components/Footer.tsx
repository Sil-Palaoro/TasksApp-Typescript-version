//Componente Footer con  boton "Volver atras", excepto en el Home
"use client";
import { useState, useEffect } from 'react';
import Atras from "./Atras.js";
import styles from "@/styles/page.module.css";

function Footer() {
  const [isClientFooter, setIsClientFooter] = useState(false)
 
  useEffect(() => {
    setIsClientFooter(true)
  }, [])
 
  return (
    <>
      {isClientFooter == true ?
        <div>
          <div>
          <Atras className={styles.botonatras} />
          </div>
          <h3 style={{   
          fontFamily: 'Raleway',     
          position: 'relative',
          bottom: 0,                
          }}>Copyright@2025 Silvina Palaoro</h3>
        </div> :
        ""}
    </>    
  )
}

export default Footer