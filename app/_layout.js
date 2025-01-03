import React from 'react';
import { Stack } from 'expo-router';
import { CountProvider } from '../context/CountContext';  // Import context provider

const Layout = () => {
  return (
    <CountProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </CountProvider>
  );
};

export default Layout;
