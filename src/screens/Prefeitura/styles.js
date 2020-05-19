/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { Text } from '../../components';

import colors from '../../utils/colors';

export const HeaderContainer = styled.View`
  padding: 20px;
  background-color: ${colors.Blu};
`;

export const HeaderButtonContainer = styled.View`
  flex-direction: row;
`;

const Button = styled.TouchableOpacity`
  flex: 1;
  padding: 8px 10px;
  margin: 0 10px;
  background-color: #eee;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  border: 3px solid;
  border-color: ${props =>
    props.selected === props.position ? colors.LightBlu : colors.Blu};
`;

export const HeaderIconContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: 30px 20px 0px 20px;
`;

export const InfoContainer = styled.View`
  padding: 0 10px;
`;

export const Subtitle = styled(Text)`
  font-weight: 700;
  font-size: 16px;
`;

export const HeaderButton = props => {
  const { label, selected, position } = props;
  const { onPress = () => {} } = props;

  return (
    <Button
      position={position}
      selected={selected}
      onPress={() => {
        onPress();
      }}
    >
      <Text>{label}</Text>
    </Button>
  );
};
