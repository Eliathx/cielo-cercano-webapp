import { useNeoData } from "../../context/NeoDataContext";
import { useEffect, useState } from "react";
import styles from "./Loading.module.css";

const LoadingScreen = ({ isLoadingVisible }) => {
  const { loading } = useNeoData();
  const [slideUp, setSlideUp] = useState(false);

  useEffect(() => {
    if (!loading) {
      setSlideUp(true);
      const timeout = setTimeout(() => {
      }, 1300);
      return () => clearTimeout(timeout);
    } else {
      setSlideUp(false);
    }
  }, [loading]);

  if (!isLoadingVisible) return null;

  return (
    <div
      className={`${styles.loadingOverlay} ${slideUp ? styles.slideUp : ""}`}
    >
      <div className={"loadingIcon"}>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" d="M10 19a6 6 0 0 0-7.915-5.688M17 8a6 6 0 0 0 4.823 5.885m-3.505-9.637q-.286.356-.515.752"/>
            <path d="M16 16a1 1 0 1 1-2 0a1 1 0 0 1 2 0Z"/>
            <path strokeLinecap="round" d="M13 8.5a2.5 2.5 0 1 0-2.5 2.5"/>
            <path strokeLinecap="round" d="M7 3.338A9.95 9.95 0 0 1 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12c0-1.821.487-3.53 1.338-5"/>
          </g>
        </svg>
      </div>
      <p>Cargando datos...</p>
    </div>
  );
};

export default LoadingScreen;
