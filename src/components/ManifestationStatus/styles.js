import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  background: #fff;
  border-radius: 8px;
  padding: 10px 20px;
  margin-bottom: 10px;
`;

export const Description = styled.Text`
  font-family: 'OpenSans-Regular';
  font-size: 16px;
`;

export const DateText = styled.Text`
  font-family: 'OpenSans-Italic';
  font-size: 14px;
  opacity: 0.8;
`;
