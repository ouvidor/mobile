import React from 'react';

/** Importando nossas rotas */
import Routes from './routes';
import SessionContextProvider from './store/session';

export default function App() {
  return (
    <SessionContextProvider>
      <Routes />
    </SessionContextProvider>
  )
}
