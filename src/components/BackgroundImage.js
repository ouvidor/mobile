/* eslint-disable react/prop-types */
import React from 'react';
import { ImageBackground } from 'react-native';

export const StandardBackground = ({ children }) => {
  return (
    <ImageBackground
      style={{ flex: 1, backgroundColor: '#d0dae0' }}
      imageStyle={{ flex: 1 }}
      resizeMode="repeat"
      resizeMethod="resize"
      source={require('../assets/images/hideout.png')}>
      {children}
    </ImageBackground>
  );
};
