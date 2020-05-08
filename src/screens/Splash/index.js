/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import { getJWT } from '../../helpers';

export default function Splash({ navigation }) {
  /**
   * @author Lucas Sousa
   * @since 2020.01.22
   * @description
   * Checa se temos um JWT armazenado no dispositivo e navega para a tela correspondente.
   */
  async function checkAuth() {
    const jwt = await getJWT();
    if (jwt) {
      navigation.replace('Home');
    } else {
      navigation.replace('Login');
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
      <Image
        style={{maxWidth: 200, maxHeight: 200}}
        source={require('../../assets/images/logoOuvidor.png')}
      />
    </View>
  );
}
