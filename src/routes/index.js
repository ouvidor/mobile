/**
 * Estrutura de navegação do App.
 */

import React from 'react';
import { NavigationNativeContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

/** Importação das telas */
import Splash from '../screens/Splash';
import Login from '../screens/Login';

/** Criando Stack. Navigators que sejam uma stack utilizarão Stack.Navigator e Stack.Screen */
const Stack = createStackNavigator();

/** Criando root navigator do App. */
function Root() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={Splash} />
      {/* <Stack.Screen name="Auth" component={AuthStack} /> */}
      {/* <Stack.Screen name="App" component={AppStack} /> */}
    </Stack.Navigator>
  );
}

export default function Routes() {
  return (
    <NavigationNativeContainer>
      <Stack.Navigator initialRouteName="Splash" headerMode="none">
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationNativeContainer>
  );
}
