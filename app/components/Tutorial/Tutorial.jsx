import { useState, useEffect } from 'react';
import styles from './Tutorial.module.css'; 

const Tutorial = () => {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true); 
      setTimeout(() => setVisible(false), 500); 
    }, 60000); // esperar 60 segundos para quitar el tutorial

    return () => clearTimeout(timer);
  }, []);

  return visible ? (
    <div className={`${styles.tutorialContainer} ${fadeOut ? styles.fadeOut : ''}`}>
      <div className={styles.tutorialContent}>
        <div className={"mouseIcon"}>
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="m12 5l.53-.53a.75.75 0 0 0-1.06 0zm0 8l-.53.53a.75.75 0 0 0 1.06 0zM9.47 6.47a.75.75 0 0 0 1.06 1.06zm4 1.06a.75.75 0 1 0 1.06-1.06zm-2.94 2.94a.75.75 0 1 0-1.06 1.06zm4 1.06a.75.75 0 1 0-1.06-1.06zM3.25 10v4h1.5v-4zm17.5 4v-4h-1.5v4zm-9.5-9v8h1.5V5zm.22-.53l-2 2l1.06 1.06l2-2zm0 1.06l2 2l1.06-1.06l-2-2zm1.06 6.94l-2-2l-1.06 1.06l2 2zm0 1.06l2-2l-1.06-1.06l-2 2zM20.75 10A8.75 8.75 0 0 0 12 1.25v1.5A7.25 7.25 0 0 1 19.25 10zM12 22.75A8.75 8.75 0 0 0 20.75 14h-1.5A7.25 7.25 0 0 1 12 21.25zM3.25 14A8.75 8.75 0 0 0 12 22.75v-1.5A7.25 7.25 0 0 1 4.75 14zm1.5-4A7.25 7.25 0 0 1 12 2.75v-1.5A8.75 8.75 0 0 0 3.25 10z"></path></svg>
        </div>
        <div className={styles.tutorialText}>
          <p>Usa la rueda del ratón para acercar y alejarte</p>
          <p>y el click derecho para mover el espacio 3D.</p>
        </div>
        <button onClick={()=>{
          setFadeOut(true) 
          setVisible(false)}}>¡Entendido!</button>
      </div>
    </div>
  ) : null;
};

export default Tutorial;
