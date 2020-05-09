import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

/** Importando nossas rotas */
import Routes from './routes';
import SessionContextProvider from './store/session';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SessionContextProvider>
      <Routes />
    </SessionContextProvider>
  );
}
