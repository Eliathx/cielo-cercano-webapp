"use client"
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import styles from './SpaceCanvas.module.css';
import CameraControls from 'camera-controls';
import { useNeoData } from '../../context/NeoDataContext';
import Settings from '../Settings/Settings';
import FilterOptions from '../FilterOptions/FilterOptions';
import { useFilterSettings } from '../../context/FilterSettingsContext';

CameraControls.install({ THREE: THREE });

const SpaceCanvas = ({ setTooltipVisible }) => {
  const { filteredNeoData, setSelectedNeoData, selectedNeoData } = useNeoData();
  const { filterVisible } = useFilterSettings();

  const canvasRef = useRef(null);
  const [scene, setScene] = useState(null);
  const [camera, setCamera] = useState(null);
  const [renderer, setRenderer] = useState(null);
  const [labelRenderer, setLabelRenderer] = useState(null);
  const [cameraControls, setCameraControls] = useState(null);

  const [earthGroup, setEarthGroup] = useState(null);

  const addStars = (scene) => {
    const starCount = 20000; 
    const starGeometry = new THREE.BufferGeometry();
    
    // colores definidos para las estrellas
    const colors = [0xadd8e6, 0xffd6cb, 0x60b7f0, 0xbd9b9b];
    
    const positions = new Float32Array(starCount * 3);
    
    for (let i = 0; i < starCount; i++) {
      // posición aleatoria de las estrellas
      positions[i * 3] = (Math.random() - 0.5) * 100000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100000; 
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100000; 
    }
    
    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    // crear materiales para cada color
    const materials = colors.map(color => new THREE.PointsMaterial({
      color: color, 
      size: Math.floor(Math.random() * 30), 
    }));
  
    // crear puntos para cada color y agregarlos a la escena
    const stars = new THREE.Group();
    
    for (let i = 0; i < colors.length; i++) {
      const colorStarCount = starCount / colors.length;  
      const colorPositions = new Float32Array(colorStarCount * 3);
      
      for (let j = 0; j < colorStarCount; j++) {
        const index = i * colorStarCount + j;
        
        colorPositions[j * 3] = positions[index * 3];
        colorPositions[j * 3 + 1] = positions[index * 3 + 1];
        colorPositions[j * 3 + 2] = positions[index * 3 + 2];
      }
      
      const colorGeometry = new THREE.BufferGeometry();
      colorGeometry.setAttribute('position', new THREE.BufferAttribute(colorPositions, 3));
      
      const colorStars = new THREE.Points(colorGeometry, materials[i]);
      stars.add(colorStars);
    }
    
    scene.add(stars);
  };
  
  const textureLoader = new THREE.TextureLoader();

  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 40000);
    camera.position.set(640, 200, 600);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(2);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    
    canvasRef.current.appendChild(renderer.domElement);

    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    labelRenderer.domElement.style.pointerEvents = 'none';
    canvasRef.current.appendChild(labelRenderer.domElement);

    // configurar CameraControls para mover la cámara por la escena
    const cameraControls = new CameraControls(camera, renderer.domElement);
    cameraControls.infinityDolly = true;
    cameraControls.dollyToCursor = true;

    cameraControls.maxPolarAngle = Math.PI / 2;
    cameraControls.setTarget(0, 0, 0);
    cameraControls.updateCameraUp(new THREE.Vector3(0, 1, 0));

    // texturas para la Tierra (planetpixelemporium.com)
    const earthGroup = new THREE.Group();
    earthGroup.rotation.z = -23.4 * Math.PI / 180;
    scene.add(earthGroup);

    const earthGeometry = new THREE.IcosahedronGeometry(250, 12);
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: textureLoader.load("/textures/00_earthmap1k.jpg"),
      specularMap: textureLoader.load('/textures/02_earthspec1k.jpg'),
      bumpMap: textureLoader.load('/textures/01_earthbump1k.jpg'),
      bumpScale: 0.04,
    });
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    earthGroup.add(earthMesh);

    const lightsMaterial = new THREE.MeshBasicMaterial({
      map:textureLoader.load("/textures/03_earthlights1k.jpg"),
      blending: THREE.AdditiveBlending,
    });
    const lightsMesh = new THREE.Mesh(earthGeometry, lightsMaterial);
    earthGroup.add(lightsMesh);

    const cloudsMat = new THREE.MeshStandardMaterial({
      map: textureLoader.load("/textures/04_earthcloudmap.jpg"),
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      alphaMap: textureLoader.load('/textures/05_earthcloudmaptrans.jpg'),
    });
    const cloudsMesh = new THREE.Mesh(earthGeometry, cloudsMat);
    cloudsMesh.scale.setScalar(1.05);
    earthGroup.add(cloudsMesh);
    
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
    sunLight.position.set(-2, 0.5, 1.5);
    scene.add(sunLight);
    
    setEarthGroup(earthGroup);

    setScene(scene);
    setCamera(camera);
    setRenderer(renderer);
    setLabelRenderer(labelRenderer);
    setCameraControls(cameraControls);
    addStars(scene);
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      labelRenderer.setSize(width, height);
    };

    const debouncedHandleResize = debounce(handleResize, 100);
    window.addEventListener('resize', debouncedHandleResize);

    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
      renderer.dispose();
      cameraControls.dispose();
    };
  }, []);

  
  
  useEffect(() => {
    if (scene && filteredNeoData.length > 0) {
      // limpiar la visibilidad de los NEOs, órbitas y etiquetas existentes
      const neoObjects = scene.children.filter(child => child.name.startsWith('neo'));
      const orbitObjects = scene.children.filter(child => child.name.startsWith('orbit'));
      const labelObjects = scene.children.filter(child => child.name.startsWith('label'));

      neoObjects.forEach(child => child.visible = false);
      orbitObjects.forEach(child => child.visible = false);
      labelObjects.forEach(child => {
        const labelElement = document.getElementById(child.name);
        if (labelElement) {
          labelElement.hidden = true;
        }
      });

      // hacer visibles los NEOs y sus órbitas
      filteredNeoData.forEach((neo) => {
        const neoObject = neoObjects.find(child => child.name === 'neo' + neo.name);
        const orbitObject = orbitObjects.find(child => child.name === 'orbit' + neo.name);
        const labelObject = labelObjects.find(child => child.name === 'label' + neo.name);

        if (neoObject) {
          neoObject.visible = true; 
        } else {
          
          const missDistance = parseFloat(neo.close_approach_data[0].miss_distance.kilometers);
          const angle = Math.random() * 2 * Math.PI;
          const radius = missDistance / 0.035e5 + 500; //añadir el diametro de la tierra al final (realmente no está a escala, la tierra tendria un diametro como de 200k unidades)
  
          const orbitGeometry = new THREE.RingGeometry(radius - 0.1, radius + 0.1, 250);
          const orbitMaterial = new THREE.MeshBasicMaterial({ color: 0xa4a4a4, side: THREE.DoubleSide });
          const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
          orbit.position.set(0, 0, 0);
          orbit.rotation.x = Math.PI / 2;
          orbit.name = 'orbit' + neo.name;
          scene.add(orbit);
  
          const neoGeometry = new THREE.IcosahedronGeometry(1, 1);
          const neoMaterial = new THREE.MeshBasicMaterial({
            color: neo.is_potentially_hazardous_asteroid ? 0x9b1616 : 0x05c512,
          });
          const neoMesh = new THREE.Mesh(neoGeometry, neoMaterial);
  
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);
          neoMesh.position.set(x, 0, y);
          neoMesh.name = 'neo' + neo.name;
          scene.add(neoMesh);
  
          
          const labelDiv = document.createElement('div');
          labelDiv.id = 'label' + neo.name;
          labelDiv.textContent = neo.name;
          labelDiv.style.marginTop = '-1em';
  
          const label = new CSS2DObject(labelDiv); // crear etiqueta con CSS2DObject (básicamente un elemento HTML con posición 3D)
          label.position.set(x, 1, y);
          label.name = 'label' + neo.name; 
          scene.add(label);
        }
  
        if (orbitObject) {
          orbitObject.visible = true; 
        }
  
        if (labelObject) {
          const labelElement = document.getElementById(labelObject.name);
          if (labelElement) {
             labelElement.hidden = false;
          }
        }
      }); 
    }
  }, [filteredNeoData, scene]);
  
  const getDataFromSelectedNeoObject = (mouse) => {
    const raycaster = new THREE.Raycaster(); // crear un raycaster para detectar el objeto
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);
  
    if (intersects.length > 0) {
      const selectedNeoObject = intersects[0].object;
      const selectedNeoName = selectedNeoObject.name.replace('neo', ''); // eliminar el prefijo 'neo' para obtener solo el nombre
      const selectedNeoData = filteredNeoData.find(neo => neo.name === selectedNeoName);
      return selectedNeoData || null;
    }
  
    return null;
  };
  
  const animateCameraToTarget = (selectedNeoData) => {
    if (!selectedNeoData) return;
  
    // buscar el objeto 3D del NEO en la escena
    const selectedNeoObject = scene.children.find(child => child.name === 'neo' + selectedNeoData.name);
    if (!selectedNeoObject) return;
  
    const offsetX = selectedNeoObject.position.x > 0 ? 50 : -50;
    const targetPosition = selectedNeoObject.position.clone().add(new THREE.Vector3(offsetX, 5, 0));
  
    const lookAtTarget = selectedNeoObject.position.clone(); 
  
    const startPosition = camera.position.clone();
    const startLookAt = cameraControls.getTarget(new THREE.Vector3());
    const duration = 1.5;
    const startTime = performance.now();
  
    const animate = () => {
      const elapsedTime = (performance.now() - startTime) / 1000;
      const progress = Math.min(elapsedTime / duration, 1);
  
      // interpolación de posición y orientación
      camera.position.lerpVectors(startPosition, targetPosition, progress);
      const currentLookAt = startLookAt.clone().lerp(lookAtTarget, progress);
      cameraControls.setLookAt(
        camera.position.x,
        camera.position.y,
        camera.position.z,
        currentLookAt.x,
        currentLookAt.y,
        currentLookAt.z
      );
  
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
  
    animate();
  };
  
  const onMouseMove = (event) => {
    const mouse = calculateMousePosition(event);
    const selectedNeoData = getDataFromSelectedNeoObject(mouse);
    if (selectedNeoData) {
      canvasRef.current.style.cursor = 'pointer';
    } else {
      canvasRef.current.style.cursor = 'default';
    }
  };

  const handleMouseClick = (event) => {
    const mouse = calculateMousePosition(event);
    const selectedNeoData = getDataFromSelectedNeoObject(mouse);

    if (selectedNeoData) {
      setSelectedNeoData({...selectedNeoData});
      setTooltipVisible(true);
    } 
  };

 useEffect(() => {
    if (selectedNeoData) {
      animateCameraToTarget(selectedNeoData);
    }
  }, [selectedNeoData]);

  useEffect(() => {
    if (renderer && scene && camera && labelRenderer) {
      const clock = new THREE.Clock();
      let animationId;
  
      const animate = () => {
        const delta = clock.getDelta();
        cameraControls.update(delta);
        renderer.render(scene, camera);
        labelRenderer.render(scene, camera);
        earthGroup.rotation.y += 0.0001; 
        scene.children.forEach((child) => {
          
          if (child instanceof CSS2DObject) {
            const distance = camera.position.distanceTo(child.position);
            child.visible = distance <= 1000;
          }
        });
        animationId = requestAnimationFrame(animate);
      };
      animate();
  
      return () => cancelAnimationFrame(animationId); // Cleanup
    }
  }, [renderer, scene, camera, labelRenderer, cameraControls]);
  

  const calculateMousePosition = (event) => {
    const mouse = new THREE.Vector2();
    const rect = canvasRef.current.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    return mouse;
  };

  const zoomIn = () => {
    cameraControls.dolly(20, true);
  };

  const zoomOut = () => {
    cameraControls.dolly(-20, true);
  };

  const resetCamera = () => {
    if (!camera || !cameraControls) return;
  
    const targetPosition = new THREE.Vector3(640, 200, 600);
    const lookAtTarget = new THREE.Vector3(0, 0, 0);
  
    const startPosition = camera.position.clone();
    const startLookAt = cameraControls.getTarget(new THREE.Vector3());
    const duration = 1.5;
    const startTime = performance.now();
  
    const animate = () => {
      const elapsedTime = (performance.now() - startTime) / 1000;
      const progress = Math.min(elapsedTime / duration, 1);
  
      // interpolación de posición y orientación
      camera.position.lerpVectors(startPosition, targetPosition, progress);
      const currentLookAt = startLookAt.clone().lerp(lookAtTarget, progress);
      cameraControls.setLookAt(
        camera.position.x,
        camera.position.y,
        camera.position.z,
        currentLookAt.x,
        currentLookAt.y,
        currentLookAt.z
      );
  
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
  
    animate();
  };
  
  return (
    <>
      <Settings setTooltipVisible={setTooltipVisible} zoomIn={zoomIn} zoomOut={zoomOut} resetCamera={resetCamera} />
      <div ref={canvasRef} className={styles.canvas} onClick={handleMouseClick} onMouseMove={onMouseMove} />
      {filterVisible ? <FilterOptions/> : null}
    </>
  );
};

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export default SpaceCanvas;