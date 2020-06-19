/**
 * Estrutura de navegação do App.
 */

import React from 'react';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';

import colors from '../utils/colors';
import { TabBarLabel } from '../components';
/** Importação das telas */
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Cadastro from '../screens/Cadastro';
import AddManifestation from '../screens/Manifestation/AddManifestation';
import Menu from '../screens/Menu';
import Perfil from '../screens/Perfil';
import EditarPerfil from '../screens/Perfil/EditProfile';
import Historico from '../screens/Perfil/Historic';
import Info from '../screens/Info';
import ManifestationDetails from '../screens/ManifestationDetails';
import ManifestationStatusDetails from '../screens/ManifestationStatusDetails';
import EditManifestation from '../screens/ManifestationDetails/EditManifestation';
import SearchManifestation from '../screens/Manifestation/SearchManifestation';
import Notification from '../screens/Notification/Notification';

/** Component para */

/** Criando Stack. Navigators que sejam uma stack utilizarão Stack.Navigator e Stack.Screen */
const Stack = createStackNavigator();

const StackPerfil = createStackNavigator();
const StackPerfilNavigator = () => {
  return (
    <StackMenu.Navigator
      initialRouteName="Perfil"
      headerMode="none"
      screenOptions={{
        gestureEnabled: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <StackMenu.Screen name="Perfil" component={Perfil} />
      <StackMenu.Screen name="EditarPerfil" component={EditarPerfil} />
      <StackMenu.Screen name="Historico" component={Historico} />
    </StackMenu.Navigator>
  );
};

const StackMenu = createStackNavigator();
const StackMenuNavigator = () => {
  return (
    <StackMenu.Navigator
      initialRouteName="Menu"
      headerMode="none"
      screenOptions={{
        gestureEnabled: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <StackMenu.Screen
        options={{ headerShown: false }}
        name="Menu"
        component={Menu}
      />
      <StackMenu.Screen name="Perfil" component={StackPerfilNavigator} />
      <StackMenu.Screen name="Info" component={Info} />
    </StackMenu.Navigator>
  );
};

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
  /** Definindo estilo para icon/label */
  const { globalColors } = colors;
  const tabColor =
    currentRoute === route.name ? globalColors.primaryColor : '#646464';
  const iconSize = 21;

  const screenOptions = {
    Home: {
      tabBarIcon: () => (
        <Feather name="home" color={tabColor} size={iconSize} />
      ),
      tabBarLabel: ({ focused }) => (
        <TabBarLabel focused={focused}>Início</TabBarLabel>
      ),
    },
    SearchManifestation: {
      tabBarIcon: () => (
        <Foundation name="magnifying-glass" color={tabColor} size={iconSize} />
      ),
      tabBarLabel: ({ focused }) => (
        <TabBarLabel focused={focused}>Buscar</TabBarLabel>
      ),
    },
    AddManifestation: {
      tabBarIcon: () => (
        <Feather name="plus-circle" color={tabColor} size={iconSize} />
      ),
      tabBarLabel: ({ focused }) => (
        <TabBarLabel focused={focused}>Criar</TabBarLabel>
      ),
    },
    Menu: {
      tabBarIcon: () => (
        <Feather name="menu" color={tabColor} size={iconSize} />
      ),
      tabBarLabel: ({ focused }) => (
        <TabBarLabel focused={focused}>Menu</TabBarLabel>
      ),
    },
    default: {
      tabBarIcon: () => (
        <Feather name="home" color={tabColor} size={iconSize} />
      ),
      tabBarLabel: ({ focused }) => (
        <TabBarLabel focused={focused}>Title</TabBarLabel>
      ),
    },
  };

  return screenOptions[route.name] || screenOptions.default;
}

const HomeTabs = createBottomTabNavigator();
const HomeTabNavigator = () => {
  return (
    <HomeTabs.Navigator
      screenOptions={({ route }) => getScreenOptionsForRoute(route)}>
      <HomeTabs.Screen name="Home" component={Home} />
      <HomeTabs.Screen
        name="SearchManifestation"
        component={SearchManifestation}
      />
      <HomeTabs.Screen name="AddManifestation" component={AddManifestation} />
      <StackMenu.Screen name="Menu" component={StackMenuNavigator} />
    </HomeTabs.Navigator>
  );
};

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        headerMode="none"
        screenOptions={{
          gestureEnabled: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={HomeTabNavigator} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <StackMenu.Screen
          name="ManifestacaoDetalhes"
          component={ManifestationDetails}
        />
        <StackMenu.Screen
          name="EditManifestation"
          component={EditManifestation}
        />
        <StackMenu.Screen
          name="ManifestationStatusDetails"
          component={ManifestationStatusDetails}
        />
        <StackMenu.Screen name="Notificacao" component={Notification} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
