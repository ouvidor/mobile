import styled from 'styled-components/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { Container } from '../Container';
import { Button } from '../Button';

export const Title = styled.Text`
  font-family: 'OpenSans-Bold';
  font-size: 20px;
  text-align: center;
  margin-bottom: 10px;
`;

export const AvaliationContainer = styled(Container)`
  margin: 0;
`;

export const RatingContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export const RatingStar = styled(AntDesign).attrs(props => ({
  name: props.selected ? 'star' : 'staro',
  color: '#9762F5',
  size: 26,
}))`
  margin: 5px;
`;

export const AvaliateBtn = styled(Button).attrs(props => ({
  touchableProps: {
    onPress: props.onPress,
  },
  textProps: {
    title: 'Avaliar',
    loading: props.loading,
  },
}))``;
