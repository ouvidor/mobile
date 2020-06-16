import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import Api from '../services/Api';

// contêm o provider e o consumer, essencial para o uso do estado global
const SessionContext = createContext({});

const SessionContextProvider = ({ children }) => {
  const [session, setSession] = useState(async () => {
    const token = await AsyncStorage.getItem('@Ouvidor:token');
    const city = await AsyncStorage.getItem('@Ouvidor:city');
    const profile = await AsyncStorage.getItem('@Ouvidor:profile');

    console.log('CHECA SE PROFILE EXISTE: ', profile);
    if (!profile) {
      console.log('DEVERIA LIMPAR');

      await AsyncStorage.removeItem('@Ouvidor:city');
      await AsyncStorage.removeItem('@Ouvidor:token');
      await AsyncStorage.removeItem('@Ouvidor:profile');

      console.log('LIMPOU?', await AsyncStorage.getAllKeys());
      return {};
    }

    const parsedProfile = JSON.parse(profile);

    if (token && city) {
      Api.saveToken(token);
      return { token, profile: parsedProfile, city };
    }

    return {};
  });

  useEffect(() => {
    Api.saveToken(session.token);
  }, [session]);

  const signIn = useCallback(async ({ email, password, city }) => {
    const signInData = await Api.post('/auth', {
      email,
      password,
      city,
    });

    console.log(signInData);

    if (!signInData || signInData.error || signInData.status) {
      console.info('Não foi possível fazer login.');
      setSession({});
      return signInData;
    }

    await AsyncStorage.setItem('@Ouvidor:city', signInData.city);
    await AsyncStorage.setItem('@Ouvidor:token', signInData.token);
    await AsyncStorage.setItem(
      '@Ouvidor:profile',
      JSON.stringify(signInData.user)
    );

    console.log('Login foi feito com sucesso!');
    setSession({
      token: signInData.token,
      profile: signInData.user,
      city: signInData.city,
    });

    return signInData;
  }, []);

  const signOut = useCallback(async () => {
    await Promise.all([
      AsyncStorage.removeItem('@Ouvidor:city'),
      AsyncStorage.removeItem('@Ouvidor:token'),
      AsyncStorage.removeItem('@Ouvidor:profile'),
    ]);

    console.info('Você fez logout');

    setSession({});
  }, []);

  const updateProfile = useCallback(async data => {
    const updateProfileData = await Api.put({
      pathUrl: `user/${data.id}`,
      data,
    });

    if (!updateProfileData) {
      return;
    }

    delete updateProfileData.created_at;
    delete updateProfileData.updated_at;

    await AsyncStorage.setItem(
      '@Ouvidor:profile',
      JSON.stringify(updateProfileData)
    );
    console.log('Perfil atualizado com sucesso!');
    setSession(oldSession => ({
      ...oldSession,
      profile: updateProfileData,
    }));
  }, []);

  return (
    <SessionContext.Provider
      value={{
        profile: session.profile,
        city: session.city,
        signIn,
        signOut,
        updateProfile,
      }}>
      {children}
    </SessionContext.Provider>
  );
};

function useSession() {
  const session = useContext(SessionContext);

  if (!session) {
    throw new Error(
      'useSession deveria estar dentro de um componente SessionContextProvider'
    );
  }

  return session;
}

export { SessionContextProvider, useSession };
