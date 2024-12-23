"use client";
import { useState, useEffect } from "react";
import Tooltip from "./components/Tooltip/Tooltip";
import styles from "./page.module.css";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import SpaceCanvas from "./components/SpaceCanvas/SpaceCanvas";
import { useNeoData } from "./context/NeoDataContext";
import Tutorial from "./components/Tutorial/Tutorial";

export default function Home() {
  const { loading } = useNeoData();
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [isLoadingVisible, setIsLoadingVisible] = useState(true);

  useEffect(() => {
    if (!loading) {
      const timeout = setTimeout(() => {
        console.log("voy a mostrar")
        setIsLoadingVisible(false);
      }, 500); 
      return () => clearTimeout(timeout);
    } else {
      setIsLoadingVisible(true);
    }
  }, [loading]);

  return (
    <div className={styles.container}>
        <>
          {isLoadingVisible ? <LoadingScreen isLoadingVisible={isLoadingVisible} /> : <> <SpaceCanvas
            setTooltipVisible={setTooltipVisible} setIsLoadingVisible={setIsLoadingVisible}
          />
          <Tutorial />
          {tooltipVisible && <Tooltip setTooltipVisible={setTooltipVisible} />}</> }
          
          
        </>
    </div>
  );
}
