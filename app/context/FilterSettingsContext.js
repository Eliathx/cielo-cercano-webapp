"use client";

import { createContext, useState, useContext} from 'react';

const FilterContext = createContext();

export const FilterSettingsProvider = ({ children }) => {
  const [filterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState({
    missDistance: [],
    isHazardous: false,
    size: [],
    speed: [],
  });


  return (
    <FilterContext.Provider value={{ filterVisible, setFilterVisible, filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterSettings = () => {
  return useContext(FilterContext);
};