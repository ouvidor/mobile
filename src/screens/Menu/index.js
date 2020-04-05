/* eslint-disable react/prop-types */
import React from 'react';
import { ScrollableContainer, Text } from '../../components';
import { SignOut } from '../../helpers';

export default function Menu({ navigation }) {
  return (
    <ScrollableContainer>
      <Text
        onPress={async () => {
          const signOut = await SignOut();
          if (signOut) {
            navigation.replace('Login');
          }
        }}
      >
        Menu
      </Text>
    </ScrollableContainer>
  );
}
