import Slider from 'react-slick';
import styles from './Tooltip.module.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useNeoData } from "../../context/NeoDataContext";

const TooltipNextArrow = ({ onClick}) => (
  <div onClick={onClick} className={styles.tooltipNextArrow}>
    <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path
          strokeDasharray="16"
          strokeDashoffset="16"
          d="M5 12h13.5"
        >
          <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="16;0" />
        </path>
        <path
          strokeDasharray="10"
          strokeDashoffset="10"
          d="M19 12l-5 5M19 12l-5 -5"
        >
          <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.2s" values="10;0" />
        </path>
      </g>
    </svg>
  </div>
);

const TooltipPrevArrow = ({ onClick}) => (
  <div onClick={onClick} className={styles.tooltipPrevArrow}>
    <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path
          strokeDasharray="16"
          strokeDashoffset="16"
          d="M19 12h-13.5"
        >
          <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="16;0" />
        </path>
        <path
          strokeDasharray="10"
          strokeDashoffset="10"
          d="M5 12l5 5M5 12l5 -5"
        >
          <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.2s" values="10;0" />
        </path>
      </g>
    </svg>
  </div>
);

const Tooltip = () => {

  const { selectedNeoData } = useNeoData();

  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <TooltipNextArrow />,
    prevArrow: <TooltipPrevArrow />,
  };

  return (
    <div className={styles.tooltip}>
      <h2>{selectedNeoData.name}</h2>
      <Slider {...settings}>
        <section>
          <div className={styles.tooltipSubtitle}>
          <svg width="1em" height="1em" viewBox="0 0 24 24" strokeWidth={1.5} fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M21.9999 16C21.9999 10.4772 17.5228 6 11.9999 6C7.89931 6 4.37514 8.46819 2.83203 12" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"></path><path d="M2 17C2.55228 17 3 16.5523 3 16C3 15.4477 2.55228 15 2 15C1.44772 15 1 15.4477 1 16C1 16.5523 1.44772 17 2 17Z" fill="currentColor" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"></path><path d="M2 16H12" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z" fill="currentColor" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"></path></svg> 
          <h3>Distancia de la Tierra</h3>
          </div>
          <p className='secondaryText'>{parseFloat(selectedNeoData.close_approach_data[0].miss_distance.kilometers).toLocaleString()} km</p>
        </section>
        <section >
          <div className={styles.tooltipSubtitle}>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}><circle cx="19" cy="19" r="2"></circle><circle cx="5" cy="5" r="2"></circle><path d="M6.48 3.66a10 10 0 0 1 13.86 13.86M6.41 6.41l11.18 11.18M3.66 6.48a10 10 0 0 0 13.86 13.86"></path></g></svg>
            <h3 >Diámetro estimado</h3>
          </div>
          <p className='secondaryText'>{`${selectedNeoData.estimated_diameter.kilometers.estimated_diameter_min.toFixed(4)} - 
            ${selectedNeoData.estimated_diameter.kilometers.estimated_diameter_max.toFixed(4)}`} km</p>
        </section>
        <section>
          <div className={styles.tooltipSubtitle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}><path d="M8 2v4m8-4v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"></path></g></svg>
            <p >Fecha de aproximamiento</p>
          </div>
          <p className='secondaryText'>{selectedNeoData.close_approach_data[0].close_approach_date}</p>
        </section>
        <section>
          <div className={styles.tooltipSubtitle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 7.25a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75M12 17a1 1 0 1 0 0-2a1 1 0 0 0 0 2"></path><path fill="currentColor" fillRule="evenodd" d="M8.294 4.476C9.366 3.115 10.502 2.25 12 2.25s2.634.865 3.706 2.226c1.054 1.34 2.17 3.32 3.6 5.855l.436.772c1.181 2.095 2.115 3.75 2.605 5.077c.5 1.358.62 2.59-.138 3.677c-.735 1.055-1.962 1.486-3.51 1.69c-1.541.203-3.615.203-6.274.203h-.85c-2.66 0-4.733 0-6.274-.203c-1.548-.204-2.775-.635-3.51-1.69c-.758-1.087-.639-2.32-.138-3.677c.49-1.328 1.424-2.982 2.605-5.077l.436-.772c1.429-2.535 2.546-4.516 3.6-5.855m1.179.928C8.499 6.641 7.437 8.52 5.965 11.13l-.364.645c-1.226 2.174-2.097 3.724-2.54 4.925c-.438 1.186-.378 1.814-.04 2.3c.361.516 1.038.87 2.476 1.06c1.432.188 3.406.19 6.14.19h.727c2.733 0 4.707-.002 6.14-.19c1.437-.19 2.114-.544 2.474-1.06c.339-.486.4-1.114-.038-2.3c-.444-1.201-1.315-2.751-2.541-4.925l-.364-.645c-1.472-2.61-2.534-4.489-3.508-5.726C13.562 4.18 12.813 3.75 12 3.75s-1.562.429-2.527 1.654" clipRule="evenodd"></path></svg>
            <p >¿Peligro potencial?</p>
          </div>
          <p className='secondaryText'>{selectedNeoData.is_potentially_hazardous_asteroid ? "Sí" : "No"}</p>
        </section>
      </Slider>
    </div>
  );
};

export default Tooltip;
