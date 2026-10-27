import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppRoutes from './src/navigation/AppRoutes';
import { inicializarBanco } from './src/database/database';

export default function App() {
  useEffect(() => {
    // Inicializa a tabela do SQLite assim que a app arranca
    inicializarBanco();
  }, []);

  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  );
}