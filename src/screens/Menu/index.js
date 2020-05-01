/* eslint-disable react/prop-types */
import React,{ useContext } from 'react';
import { ScrollableContainer, Text } from '../../components';
import { SignOut } from '../../helpers';
import { SessionContext } from "../../store/session"
import { signOut } from "../../store/session/actions"

export default function Menu({ navigation }) {
  const { dispatch } = useContext(SessionContext)

  return (
    <ScrollableContainer>
      <Text
        onPress={async () => {
          const signout = await SignOut();
          if (signout) {
            dispatch(signOut())
            navigation.dangerouslyGetParent().replace('Login');
          }
        }}
      >
        Menu
      </Text>
      <Text
        onPress={ () => {
            navigation.navigate('Perfil');
        }}
      >
        Meu Perfil
      </Text>
    </ScrollableContainer>
  );
}
