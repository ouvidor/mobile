/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
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
      navigation.navigate('Home');
    } else {
      navigation.navigate('Login');
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <View>
      <Text onPress={() => navigation.navigate('Login')}>Splash screen</Text>
    </View>
  );
}
