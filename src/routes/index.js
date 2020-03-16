/* eslint-disable react/prop-types */
/**
 * Estrutura de navegação do App.
 */

import React from 'react';
import { NavigationNativeContainer, useRoute } from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

/** Importação das telas */
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Cadastro from '../screens/Cadastro';
import AddManifestation from '../screens/Manifestation/AddManifestation';
import Menu from '../screens/Menu';

/** Criando Stack. Navigators que sejam uma stack utilizarão Stack.Navigator e Stack.Screen */
const Stack = createStackNavigator();

function getTabBarIcon(route) {
  const navigationTab = useRoute();

  const currentName = navigationTab.state
    ? navigationTab.state.routeNames[navigationTab.state.index]
    : 'Home';

  const tabColor = currentName === route.name ? 'blue' : 'green';

  const tabBarIcons = {
    Home: <Ionicons name="ios-home" color={tabColor} />,
    default: <Ionicons name="ios-home" color={tabColor} />,
  };

  return tabBarIcons[route.name] || tabBarIcons.default;
}

const HomeTabs = createBottomTabNavigator();
const HomeTabNavigator = () => {
  return (
    <HomeTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: () => getTabBarIcon(route),
      })}
    >
      <HomeTabs.Screen name="Home" component={Home} />
      <HomeTabs.Screen name="AddManifestation" component={AddManifestation} />
      <HomeTabs.Screen name="Menu" component={Menu} />
    </HomeTabs.Navigator>
  );
};

export default function Routes() {
  return (
    <NavigationNativeContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        headerMode="none"
        screenOptions={{
          gestureEnabled: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={HomeTabNavigator} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
      </Stack.Navigator>
    </NavigationNativeContainer>
  );
}
