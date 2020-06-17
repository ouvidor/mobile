import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import FlashMessage from 'react-native-flash-message';

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
      <FlashMessage position="top" />
    </SessionContextProvider>
  );
}
