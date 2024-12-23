"use client";

import axios from 'axios';
import { createContext, useState, useContext, useEffect } from 'react';
import { useFilterSettings } from "./FilterSettingsContext"; // Asegúrate de tener este contexto

const apiKey = process.env.NEXT_PUBLIC_NASA_API_KEY; // Cambiar por clave propia
const NeoDataContext = createContext();

const prepareData = (neoData) => {
  const width = 800;
  const height = 600;
  const centerX = width / 2;
  const centerY = height / 2;

  return neoData.map((neo) => {
    const missDistance = parseFloat(neo.close_approach_data[0].miss_distance.kilometers);
    const angle = Math.random() * 2 * Math.PI;

    return {
      ...neo,
      name: neo.name.replace(/[()]/g, '').trim(),
      x: centerX + (missDistance / 0.0025e5) * Math.cos(angle),
      y: centerY + (missDistance / 0.0025e5) * Math.sin(angle)
    };
  });
};

const applyFilters = (neoData, filters) => {
  return neoData.filter((neo) => {
    const missDistance = parseFloat(neo.close_approach_data[0].miss_distance.kilometers);
    const size = parseFloat(neo.estimated_diameter.kilometers.estimated_diameter_max);
    const speed = parseFloat(neo.close_approach_data[0].relative_velocity.kilometers_per_second);
    const isHazardous = neo.is_potentially_hazardous_asteroid; 

    const isDistanceValid = filters.missDistance.length === 0 || 
      (missDistance >= filters.missDistance[0] && missDistance <= filters.missDistance[1]);

    const isSizeValid = filters.size.length === 0 || 
      (size >= filters.size[0] && size <= filters.size[1]);

    const isSpeedValid = filters.speed.length === 0 || 
      (speed >= filters.speed[0] && speed <= filters.speed[1]);

    const isHazardousValid = !filters.isHazardous || isHazardous === filters.isHazardous;

    return isDistanceValid && isSizeValid && isSpeedValid && isHazardousValid;
  });
};

export const NeoDataProvider = ({ children }) => {
  const [neoData, setNeoData] = useState([]); // datos sin filtrar
  const [filteredNeoData, setFilteredNeoData] = useState([]); // datos filtrados
  const [selectedNeoData, setSelectedNeoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { filters } = useFilterSettings(); 

  // fetch API
  const fetchNEOs = async () => {
    try {
      const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=2024-12-01&end_date=2024-12-07&api_key=${apiKey}`;
      const response = await axios.get(url);

      const nearEarthObjects = Object.values(response.data.near_earth_objects).flat();
      const positionedNEOs = prepareData(nearEarthObjects);

      setNeoData(positionedNEOs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching NEOs:", error);
      setLoading(false);
    }
  };

  // aplicar filtros cuando cambien los filtros
  useEffect(() => {
    // aplicar los filtros sobre los datos sin filtrar
    const filteredNEOs = applyFilters(neoData, filters);
    setFilteredNeoData(filteredNEOs); 
  }, [filters, neoData]); 

  useEffect(() => {
    fetchNEOs();
  }, []); // Solo ejecutar la llamada a la API una vez

  return (
    <NeoDataContext.Provider value={{ 
      neoData, 
      filteredNeoData, 
      applyFilters,
      setNeoData, 
      selectedNeoData, 
      setSelectedNeoData, 
      loading
    }}>
      {children}
    </NeoDataContext.Provider>
  );
};

export const useNeoData = () => {
  return useContext(NeoDataContext);
};
