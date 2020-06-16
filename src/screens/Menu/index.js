/* eslint-disable react/prop-types */
import React from 'react';

import { ScrollableContainer } from '../../components';
import { ItemMenu, ItemContainer } from './styles';
import { useSession } from '../../hooks/session';

export default function Menu({ navigation }) {
  const { signOut } = useSession();

  return (
    <ScrollableContainer>
      <ItemContainer>
        <ItemMenu
          onPress={() => {
            navigation.navigate('Perfil');
          }}>
          Meu Perfil
        </ItemMenu>
        <ItemMenu
          onPress={() => {
            navigation.navigate('Prefeitura');
          }}>
          Prefeitura
        </ItemMenu>
        <ItemMenu
          red
          onPress={async () => {
            await signOut();
            navigation
              .dangerouslyGetParent()
              .dangerouslyGetParent()
              .replace('Login');
          }}>
          Sair
        </ItemMenu>
      </ItemContainer>
    </ScrollableContainer>
  );
}
