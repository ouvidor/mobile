/* eslint-disable react/prop-types */
import React from 'react';
import { CenteredContainer, Text, Button } from '../../components';
import { SignOut } from '../../helpers';

export default function Home({ navigation }) {
  return (
    <CenteredContainer>
      <Text>Home do app</Text>
      <Button
        touchableProps={{
          onPress: async () => {
            const signOut = await SignOut();
            if (signOut) {
              navigation.replace('Login');
            }
          },
        }}
        textProps={{ title: 'Sair' }}
      />
    </CenteredContainer>
  );
}
