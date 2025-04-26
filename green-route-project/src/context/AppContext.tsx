'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Coordinates = {
  lat: number;
  lng: number;
};

type AppContextType = {
  userName: string;
  setUserName: (name: string) => void;
  startLocation: Coordinates | null;
  setStartLocation: (coords: Coordinates) => void;
  destination: string;
  setDestination: (address: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [userName, setUserName] = useState('');
  const [startLocation, setStartLocation] = useState<Coordinates | null>(null);
  const [destination, setDestination] = useState('');

  return (
    <AppContext.Provider
      value={{
        userName,
        setUserName,
        startLocation,
        setStartLocation,
        destination,
        setDestination,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used inside <AppProvider>');
  return context;
};
