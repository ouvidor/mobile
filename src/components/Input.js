/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { fontFaces, Text } from './Text';
import colors from '../utils/colors';

const { ErrorTextColor, ErrorBackground, Red, White, Gray } = colors;

export const Input = styled.TextInput`
  font-size: ${props => props.fontSize || '16px'};
  font-family: ${props => fontFaces[props.fontFamily] || fontFaces.Regular};
  border: ${StyleSheet.hairlineWidth}px;
  border-color: ${props => (props.errorMessage ? Red : Gray)};
  border-radius: 5px;
  padding: 10px;
  color: ${props => (props.errorMessage ? Red : Gray)};
  background: ${props => (props.errorMessage ? ErrorBackground : White)};
  elevation: ${props => (props.shadow ? 1 : 0)};
`;

const InputContainer = styled.View`
  margin: 8px 0;
`;

const Label = styled(Text)`
  padding-left: 3px;
  font-size: 16px;
  font-family: ${props => fontFaces[props.fontFamily] || fontFaces.SemiBold};
  color: ${props => (props.errorMessage ? ErrorTextColor : Gray)};
`;

const Error = styled(Text)`
  color: ${ErrorTextColor};
  padding-left: 3px;
  font-family: ${fontFaces.SemiBoldItalic};
`;

export const LabeledInput = ({ labelProps = {}, inputProps = {} }) => (
  <InputContainer>
    {labelProps.label && (
      <Label {...inputProps}>{labelProps.label || 'Label'}</Label>
    )}
    <Input {...inputProps} />
    {inputProps.errorMessage && <Error>{inputProps.errorMessage}</Error>}
  </InputContainer>
);
