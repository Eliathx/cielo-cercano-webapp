# Space Visualization Project

## Descripción

Este proyecto es una visualización interactiva en 3D de objetos cercanos a la Tierra (NEOs). Utiliza Three.js para renderizar la escena en un canvas WebGL y permite al usuario hacer clic en los NEOs para obtener información adicional.


## Instalación y ejecución local

Para ejecutar este proyecto localmente:
1. Clona el repositorio en tu máquina local:
```bash
git clone 
```

2. Navega a la carpeta del proyecto e instala las dependencias utilizando npm:
```bash
cd 
npm install
```
3. Cambia el valor de la clave de API de NASA en el archivo `.env` (o directamente en `NeoDataContext.js`) para utilizar tu propia clave. (Puedes obtener una clave instantaneamente en la [página de NASA](https://api.nasa.gov/index.html#apply-for-an-api-key) o utilizar la API publica de [NASA Open APIs](https://api.nasa.gov/index.html#apply-for-an-api-key)).
3. Ejecuta el proyecto localmente:
```bash
npm run dev
``` 
4. Abre el navegador y accede a la dirección `http://localhost:3000/`.

## Tecnologías utilizadas

* **[Next.js:](https://nextjs.org/):** React Framework para crear aplicaciones web de alto rendimiento.
* **[Three.js:](https://threejs.org/)** Biblioteca para crear gráficos 3D en el navegador, junto a _CSS2DRenderer_ para renderizar elementos HTML en WebGL.
* **[NASA Open API - Asteroids - NeoWs:](https://api.nasa.gov/)** API de NASA para obtener datos de NEOs.

## ¿Quieres verlo en acción?


## Retos y desafíos

* **Animación de la cámara para enfoque en el NEO seleccionado:** previamente conocía de la función lookAt, aprendí a utilizarla en OpenGL (C++) hace un tiempo atrás, por lo que tuve que volver a revisar como se hacia. 
* **Reorganización del código:** al inicio el código utilizaba "prop drilling" para pasar datos entre componentes, pero poco después tuve que reestructurarlo para utilizar un contexto para compartir datos globales.
* **Mejora la experiencia de usuario:** añadir animaciones, efectos especiales, etc. tomó un tiempo, pero mejoró la experiencia de usuario.
