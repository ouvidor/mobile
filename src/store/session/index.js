import React, { useReducer, useEffect } from 'react';
import sessionReducer from './reducer';
import AsyncStorage from '@react-native-community/async-storage';

import Api from "../../services/Api";

const initialState = {
  token: null,
  isSigned: false,
  profile: null,
};

export const SessionContext = React.createContext({
  session: initialState,
  dispatch: () => null,
});

export default function SessionContextProvider ({children}) {

  const [session, dispatch] = useReducer(sessionReducer, initialState, async() => {
    const localData = await AsyncStorage.getItem('user');
    // usa os dados guardados no AsyncStorage
    if (localData) {
      const parsedLocalData = JSON.parse(localData);
      const { token } = parsedLocalData;
      Api.setToken(token) // coloca o token salvo no axios
      return parsedLocalData;
    }

    // caso não tenha nada no AsyncStorage
    return initialState;
  });

  useEffect(() => {
    async function setItem() {
      await AsyncStorage.setItem('user', JSON.stringify(session));
      Api.setToken(session.token)
    }

    setItem();
  }, [session]);

  return (
    <SessionContext.Provider value={{ session, dispatch }}>
      {children}
    </SessionContext.Provider>
  )
}
