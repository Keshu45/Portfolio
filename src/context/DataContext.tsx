import React, { createContext, useContext } from 'react';
import defaultData from '../data.json';

const DataContext = createContext<typeof defaultData>(defaultData);

export const useData = () => useContext(DataContext);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <DataContext.Provider value={defaultData}>
      {children}
    </DataContext.Provider>
  );
};
