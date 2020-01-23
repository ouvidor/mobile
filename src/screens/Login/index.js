import React from 'react';
import { Text } from 'react-native';
import { Container } from '../../components/Container';
import { Logar } from '../../helpers';

export default function Login() {
  return (
    <Container>
      <Text onPress={Logar}>Login</Text>
    </Container>
  );
}
