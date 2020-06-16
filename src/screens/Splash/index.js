/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { View, Image } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

export default function Splash({ navigation }) {
  useEffect(() => {
    async function checkAuth() {
      const token = await AsyncStorage.getItem('@Ouvidor:token');
      if (token) {
        navigation.replace('Home');
      } else {
        navigation.replace('Login');
      }
    }

    checkAuth();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        style={{ maxWidth: 200, maxHeight: 200 }}
        source={require('../../assets/images/logoOuvidor.png')}
      />
    </View>
  );
}
