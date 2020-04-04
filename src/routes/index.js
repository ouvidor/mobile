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
import Feather from 'react-native-vector-icons/Feather';
import { TabBarLabel } from '../components';

/** Importação das telas */
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Cadastro from '../screens/Cadastro';
import AddManifestation from '../screens/Manifestation/AddManifestation';
import Menu from '../screens/Menu';

/** Component para */

/** Criando Stack. Navigators que sejam uma stack utilizarão Stack.Navigator e Stack.Screen */
const Stack = createStackNavigator();

/**
 * @param {object} route
 * @author Lucas Sousa
 * @since 2020.04.04
 * @description
 * Método onde definimos todas as configurações para determinada rota.
 */
function getScreenOptionsForRoute(route) {
  /** Definindo rota atual */
  const navigationTab = useRoute();
  const { state } = navigationTab;
  const currentRoute = state ? state.routeNames[state.index] : 'Home';
  const tabColor = currentRoute === route.name ? 'blue' : '#646464';
  const iconSize = 21;

  const screenOptions = {
    Home: {
      tabBarIcon: () => (
        <Feather name="home" color={tabColor} size={iconSize} />
      ),
      tabBarLabel: () => <TabBarLabel>Início</TabBarLabel>,
    },
    AddManifestation: {
      tabBarIcon: () => (
        <Feather name="plus-circle" color={tabColor} size={iconSize} />
      ),
      tabBarLabel: () => <TabBarLabel>Criar</TabBarLabel>,
    },
    Menu: {
      tabBarIcon: () => (
        <Feather name="menu" color={tabColor} size={iconSize} />
      ),
      tabBarLabel: () => <TabBarLabel>Menu</TabBarLabel>,
    },
    default: {
      tabBarIcon: () => (
        <Feather name="home" color={tabColor} size={iconSize} />
      ),
      tabBarLabel: () => <TabBarLabel>Title</TabBarLabel>,
    },
  };

  return screenOptions[route.name] || screenOptions.default;
}

const HomeTabs = createBottomTabNavigator();
const HomeTabNavigator = () => {
  return (
    <HomeTabs.Navigator
      screenOptions={({ route }) => getScreenOptionsForRoute(route)}
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
