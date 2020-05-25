// FIXME: quando fecho e abro o app ele retorna uma promise, quando faço login,
// retorna valor correto
import React, { useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import sessionReducer from './reducer';

import Api from '../../services/Api';

const initialState = {
  token: null,
  isSigned: false,
  profile: null,
};

export const SessionContext = React.createContext({
  session: initialState,
  dispatch: () => null,
});

async function getStorageSession() {
  const value = await AsyncStorage.getItem('session');
  return value;
}

export default function SessionContextProvider({ children }) {
  const [session, dispatch] = useReducer(sessionReducer, initialState, () => {
    const localData = getStorageSession().then(sessionStorage => {
      // usa os dados guardados no AsyncStorage
      if (sessionStorage) {
        const parsedLocalData = JSON.parse(sessionStorage);
        const { token } = parsedLocalData;
        Api.setToken(token); // coloca o token salvo no axios
        return parsedLocalData;
      }
      // caso não tenha nada no AsyncStorage

      return initialState;
    });

    return localData;
  });

  useEffect(() => {
    function setItem() {
      if ('profile' in session) {
        AsyncStorage.setItem('session', JSON.stringify(session));
        Api.setToken(session.token);
      } else {
        session.then(s => {
          console.log('session', s);
          AsyncStorage.setItem('session', JSON.stringify(s));
          Api.setToken(s.token);
        });
      }
    }

    setItem();
  }, [session]);

  return (
    <SessionContext.Provider value={{ session, dispatch }}>
      {children}
    </SessionContext.Provider>
  );
}
