import React, { createContext, useContext, useState } from 'react';

// Create the count context
const CountContext = createContext();

// Count provider component to wrap around the application
export const CountProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  const incrementCount = () => setCount(prevCount => prevCount + 1);

  return (
    <CountContext.Provider value={{ count, incrementCount }}>
      {children}
    </CountContext.Provider>
  );
};

// Custom hook for consuming context values
export const useCount = () => useContext(CountContext);
