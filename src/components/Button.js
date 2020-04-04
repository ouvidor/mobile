/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';
import { fontFaces } from './Text';
import colors from '../utils/colors';

const { Purple, Walter } = colors;

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
  color: ${props => props.textColor || Walter};
`;

export const Button = ({ touchableProps = {}, textProps = {} }) => {
  const { loading } = textProps;
  const { onPress = () => {} } = touchableProps;
  function renderButtonContent() {
    if (textProps.loading) {
      return <ActivityIndicator size="small" color={Walter} />;
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
      }}
    >
      {renderButtonContent()}
    </ButtonContainer>
  );
};
