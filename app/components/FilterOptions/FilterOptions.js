import { useState, useEffect, useCallback } from "react";
import { Checkbox, FormControlLabel, Button, Slider } from "@mui/material";
import styles from "./FilterOptions.module.css";
import { useNeoData } from "@/app/context/NeoDataContext";
import { useFilterSettings } from "@/app/context/FilterSettingsContext";

const minDistance = 0.1;
const minSize = 0.0001;
const minSpeed = 0.01;

const FilterSlider = ({ label, value, onChange, min, max, step, valueLabelFormat }) => (
  <>
    <h3>{label}</h3>
    <Slider
      value={value}
      onChange={onChange}
      valueLabelDisplay="auto"
      valueLabelFormat={valueLabelFormat}
      step={step}
      min={min}
      max={max}
    />
  </>
);

const CloseButton = () => {
  const {setFilterVisible } = useFilterSettings();
  return <svg width="24px" style={{cursor:"pointer"}} onClick={()=>setFilterVisible(false)} height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
};

export default function FilterOptions() {
  const { neoData, applyFilters } = useNeoData();
  const { filters, setFilters } = useFilterSettings();
  const [filteredCount, setFilteredCount] = useState(0);
  const [localFilters, setLocalFilters] = useState(filters);
  const [ranges, setRanges] = useState({ missDistance: [], size: [], speed: [] });

  const updateRanges = useCallback(() => {
    if (neoData?.length > 0) {
      const missDistances = neoData.map(neo => parseFloat(neo.close_approach_data[0].miss_distance.kilometers));
      const diameters = neoData.map(neo => parseFloat(neo.estimated_diameter.kilometers.estimated_diameter_max));
      const speeds = neoData.map(neo => parseFloat(neo.close_approach_data[0].relative_velocity.kilometers_per_second));

      setRanges({ // actualizar los rangos de los sliders
        missDistance: [Math.floor(Math.min(...missDistances)), Math.ceil(Math.max(...missDistances))],
        size: [Math.min(...diameters), Math.max(...diameters)],
        speed: [Math.min(...speeds), Math.max(...speeds)],
      });

      setLocalFilters(prevFilters => ({ // si los filtros locales están vacios, actualizar los rangos por defecto según los datos de la API
        ...prevFilters,
        missDistance: prevFilters.missDistance.length === 0 ? [Math.floor(Math.min(...missDistances)), Math.ceil(Math.max(...missDistances))] : prevFilters.missDistance,
        size: prevFilters.size.length === 0 ? [Math.min(...diameters), Math.max(...diameters)] : prevFilters.size,
        speed: prevFilters.speed.length === 0 ? [Math.min(...speeds), Math.max(...speeds)] : prevFilters.speed,
      }));
    }
  }, [neoData]);

  useEffect(() => {
    updateRanges();
  }, [neoData, updateRanges]);

  const handleRangeChange = (key, range, event, newValue, activeThumb, minStep) => {
    const clampedValue = newValue[1] - newValue[0] < minStep
      ? activeThumb === 0
        ? [Math.min(newValue[0], range[1] - minStep), newValue[1]]
        : [newValue[0], Math.max(newValue[1], range[0] + minStep)]
      : newValue;
    setLocalFilters(prev => ({ ...prev, [key]: clampedValue }));
  };

  const handleCheckboxChange = (key, value) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = () => {
    setFilters(localFilters);
  };

  useEffect(() => {
    if (neoData && localFilters) {
      const filteredData = applyFilters(neoData, localFilters);
      setFilteredCount(filteredData.length);
    }
  }, [localFilters, neoData, applyFilters]);

  return (
    <div className={styles.neoFilter}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Aplicar filtros</h2>
        <CloseButton/> 
       </div>
      <FilterSlider
        label="Distancia de la Tierra (km)"
        value={localFilters.missDistance}
        onChange={(e, newValue, activeThumb) => handleRangeChange("missDistance", ranges.missDistance, e, newValue, activeThumb, minDistance)}
        min={ranges.missDistance[0]}
        max={ranges.missDistance[1]}
      />

      <FilterSlider
        label="Tamaño estimado (km)"
        value={localFilters.size}
        onChange={(e, newValue, activeThumb) => handleRangeChange("size", ranges.size, e, newValue, activeThumb, minSize)}
        min={ranges.size[0]}
        max={ranges.size[1]}
        valueLabelFormat={value => value.toFixed(4)}
        step={0.0001}
      />

      <FilterSlider
        label="Velocidad relativa (km/s)"
        value={localFilters.speed}
        onChange={(e, newValue, activeThumb) => handleRangeChange("speed", ranges.speed, e, newValue, activeThumb, minSpeed)}
        min={ranges.speed[0]}
        max={ranges.speed[1]}
        valueLabelFormat={value => value.toFixed(2)}
        step={0.01}
        color="red"
      />

      <FormControlLabel
        label="Mostrar solo objetos potencialmente peligrosos"
        control={<Checkbox checked={localFilters.isHazardous} onChange={(e) => handleCheckboxChange("isHazardous", e.target.checked)} />}
      />

      <button className={styles.applyButton} onClick={handleApplyFilters}>Aplicar filtros</button>
      <p>{filteredCount} objetos por mostrar.</p>
    </div>
  );
}
