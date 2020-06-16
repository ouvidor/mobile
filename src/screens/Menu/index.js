/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { ScrollableContainer } from '../../components';
import { ItemMenu, ItemContainer } from './styles';
import { SignOut } from '../../helpers';
import { SessionContext } from '../../store/session';
import { signOut } from '../../store/session/actions';

export default function Menu({ navigation }) {
  const { dispatch } = useContext(SessionContext);

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
            navigation.navigate('Info');
          }}>
          Prefeitura
        </ItemMenu>
        <ItemMenu
          red
          onPress={async () => {
            const signout = await SignOut();
            if (signout) {
              dispatch(signOut());
              navigation
                .dangerouslyGetParent()
                .dangerouslyGetParent()
                .replace('Login');
            }
          }}>
          Sair
        </ItemMenu>
      </ItemContainer>
    </ScrollableContainer>
  );
}
