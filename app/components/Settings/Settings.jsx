import styles from "./Settings.module.css";
import { useNeoData } from "../../context/NeoDataContext";
import { useFilterSettings } from "@/app/context/FilterSettingsContext";

const Settings = ({setTooltipVisible, zoomIn, zoomOut}) => {

  const { filteredNeoData, neoData, setSelectedNeoData} = useNeoData();
  const { filterVisible, setFilterVisible } = useFilterSettings();


  const handleFullscreen = () => {
    const docElement = document.documentElement;
  
  const isFullscreen = document.fullscreenElement 
    || document.mozFullScreenElement 
    || document.webkitFullscreenElement 
    || document.msFullscreenElement;

  const toggleFullScreen = isFullscreen
    ? (document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen)
    : (docElement.requestFullscreen || docElement.mozRequestFullScreen || docElement.webkitRequestFullscreen || docElement.msRequestFullscreen);

  toggleFullScreen.call(isFullscreen ? document : docElement);
  }
  

  return (
    <div className={styles.settings}>
      <section onClick={()=>{setFilterVisible(!filterVisible)      }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
          <path
            fill="none"
            stroke="currentColor"
            strokeDasharray="56"
            strokeDashoffset="56"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M5 4h14l-5 6.5v9.5l-4 -4v-5.5Z"
          >
            <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="56;0"></animate>
          </path>
        </svg>
      </section>
      <section className={styles.settingsZoom}>
        <div onClick={zoomIn}>
          <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
            <g
              fill="none"
              stroke="currentColor"
              strokeDasharray="16"
              strokeDashoffset="16"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="M5 12h14">
                <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="16;0" />
              </path>
              <path d="M12 5v14">
                <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.4s" values="16;0" />
              </path>
            </g>
          </svg>
        </div>
        <div onClick={zoomOut}> 
          <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
            <path
              fill="none"
              stroke="currentColor"
              strokeDasharray="16"
              strokeDashoffset="16"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h14"
            >
              <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="16;0" />
            </path>
          </svg>
        </div>
      </section>
      <section onClick={()=>{handleFullscreen()}} >
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          >
            <path
              strokeDasharray="14"
              strokeDashoffset="14"
              d="M12 12l-8.5 8.5M12 12l8.5 -8.5"
            >
              <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="14;0"></animate>
            </path>
            <path
              strokeDasharray="10"
              strokeDashoffset="10"
              d="M21 3h-8M3 21v-8M21 3v8M3 21h8"
            >
              <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.3s" dur="0.2s" values="10;0"></animate>
            </path>
          </g>
        </svg>
      </section>
      <section onClick={()=>{}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M21 10q-.425 0-.712-.288T20 9V7h-2q-.425 0-.712-.288T17 6t.288-.712T18 5h2q.825 0 1.413.588T22 7v2q0 .425-.288.713T21 10M3 10q-.425 0-.712-.288T2 9V7q0-.825.588-1.412T4 5h2q.425 0 .713.288T7 6t-.288.713T6 7H4v2q0 .425-.288.713T3 10m15 9q-.425 0-.712-.288T17 18t.288-.712T18 17h2v-2q0-.425.288-.712T21 14t.713.288T22 15v2q0 .825-.587 1.413T20 19zM4 19q-.825 0-1.412-.587T2 17v-2q0-.425.288-.712T3 14t.713.288T4 15v2h2q.425 0 .713.288T7 18t-.288.713T6 19z"></path></svg>
      </section>
      <section onClick={()=>{
         const randomIndex = Math.floor(Math.random() * filteredNeoData.length);
         const randomNEOData = filteredNeoData[randomIndex];
         setSelectedNeoData({ ...randomNEOData })
         setTooltipVisible(true);
         console.log("Seleccionado:", randomNEOData.name);
      }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 14 14"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7.929 3.286V1.5a1 1 0 0 0-1-1H1.5a1 1 0 0 0-1 1v5.429a1 1 0 0 0 1 1h1.786m3.785-1.858H12.5s1 0 1 1V12.5s0 1-1 1H7.071s-1 0-1-1V7.071s0-1 1-1"></path><path d="M8.654 11.166a.25.25 0 1 1 0-.5m0 .5a.25.25 0 1 0 0-.5M3.221 3.505a.25.25 0 0 1 0-.5"></path><path d="M3.22 3.505a.25.25 0 0 0 0-.5m7.699 6.1a.25.25 0 0 1 0-.5"></path>
        <path d="M10.918 9.105a.25.25 0 0 0 0-.5"></path></g></svg>
      </section>
    </div>
  );
};

export default Settings;
