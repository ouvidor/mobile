/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';
import { Text, fontFaces } from './Text';
import colors from '../utils/colors';

const { Purple, White, globalColors } = colors;

const ButtonContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 100%;
  background: ${props => props.background || Purple};
  padding: 10px 25px;
  margin: 5px 10px;
  align-self: center;
  border-radius: 5px;
`;

const ButtonText = styled.Text`
font-size: ${props => props.fontSize || '18px'}
  font-family: ${fontFaces.Bold};
  text-align: center;
  color: ${props => props.textColor || White};
`;

export const Button = ({ touchableProps = {}, textProps = {} }) => {
  const { loading } = textProps;
  const { onPress = () => {} } = touchableProps;
  function renderButtonContent() {
    if (textProps.loading) {
      return <ActivityIndicator size="small" color={White} />;
    }
    const { title } = textProps;
    return <ButtonText {...textProps}>{title || 'Title'}</ButtonText>;
  }

  return (
    <ButtonContainer
      disabled={loading}
      {...touchableProps}
      onPress={() => {
        if (!loading) {
          onPress();
        }
      }}>
      {renderButtonContent()}
    </ButtonContainer>
  );
};

const OutlinedButtonContainer = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))`
  flex: 1;
  flex-direction: row;
  background: transparent;
  border: 1px solid
    ${props => (props.color ? props.color : globalColors.primaryColor)};
  padding: 5px 0;
  border-radius: 15px;
  margin-top: 5px;
  justify-content: center;
  align-items: center;
`;
const OutlinedButtonText = styled(Text)`
  color: ${props => (props.color ? props.color : globalColors.primaryColor)};
  text-align: center;
  font-size: 14px;
`;

export const OutlinedButton = props => {
  const { children } = props;

  return (
    <OutlinedButtonContainer {...props}>
      <OutlinedButtonText {...props}>{children}</OutlinedButtonText>
    </OutlinedButtonContainer>
  );
};
