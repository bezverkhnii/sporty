import React from 'react';
import AuthProvider from './AuthProvider';
import Routes from './Routes';
import CaloriesProvider from './CaloriesProvider';

const Providers = () => {
  return (
    <AuthProvider>
      <CaloriesProvider>
        <Routes />
      </CaloriesProvider>
    </AuthProvider>
  );
};

export default Providers;
