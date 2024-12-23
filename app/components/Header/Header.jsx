"use client";
import { useRef, useState } from "react";
import styles from "./Header.module.css";
import { SelectFace3d, InfoCircle, FilterAlt, VideoCamera, Xmark } from "iconoir-react";
import { NextArrow, PrevArrow } from "../SliderArrows/SliderArrows";

import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Header = () => {
  const modalRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const openModal = () => {
    setIsModalOpen(true);
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  return (
    <>
      <header className={styles.header}>
        <section>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" d="M10 19a6 6 0 0 0-7.915-5.688M17 8a6 6 0 0 0 4.823 5.885m-3.505-9.637q-.286.356-.515.752"/>
            <path d="M16 16a1 1 0 1 1-2 0a1 1 0 0 1 2 0Z"/>
            <path strokeLinecap="round" d="M13 8.5a2.5 2.5 0 1 0-2.5 2.5"/>
            <path strokeLinecap="round" d="M7 3.338A9.95 9.95 0 0 1 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12c0-1.821.487-3.53 1.338-5"/>
          </g>
        </svg>
          <h1>CIELO CERCANO</h1>
        </section>
        <div onClick={openModal} className={styles.infoButton}>
          <InfoCircle/>
          Información
        </div>
      </header>
      <dialog ref={modalRef} className={styles.modal}>
        
        <div style={{display:"flex", justifyContent:"space-between"}}>
          <h2>¡Bienvenido a Cielo Cercano!</h2>
          <div onClick={closeModal} style={{cursor:"pointer"}}>
            <Xmark></Xmark>
          </div>
        </div>
        <p>
          Experimenta en un entorno tridimensional interactivo donde podrás conocer sus trayectorias y explorar datos fascinantes sobre cada uno de ellos.
        </p>
        {
          isModalOpen && <InfoModalSlider /> //evitar que se muestre el modal si no está cargado completamente
        } 
        <em style={{fontSize:"0.8em"}}>
          Datos obtenidos de la API de NASA.
        </em>

      </dialog>
    </>
  );
};

export default Header;


const InfoModalSlider = () => {
var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  
  return <div>
  <Slider {...settings}>

  <section>
    <div>
      <VideoCamera/>
      <h3>Control Total de la Cámara</h3>
    </div>
    Explora el universo desde diferentes ángulos, acércate, aléjate con la rueda del ratón, mueve el espacio 3D con el clic derecho o navega directamente hacia un NEO específico haciendo clic.
    <br/>
    <br/>
  </section>

  <section>
    <div>
      <SelectFace3d/>
      <h3>Visualización 3D</h3>
    </div> 
    Los NEOs no peligrosos son representados como puntos verdes, mientras que los potencialmente peligrosos se representan como puntos rojos. 
    <br/>
    <br/>
  </section>

  <section >
    <div>
      <InfoCircle/>
      <h3>Datos Interactivos</h3>
    </div> 
    Haz clic en cualquier NEO para descubrir su distancia de aproximación más cercana, tamaño, y más.
    <br/>
    <br/>
  </section>

  <section>
    <div>
      <FilterAlt/>
      <h3>Filtros Personalizables</h3> 
    </div>
    Encuentra exactamente lo que buscas aplicando criterios avanzados como proximidad, velocidad o simplemente filtra por potenical de riesgo.
    <br/>
    <br/>
  </section>
</Slider>
</div>  
}