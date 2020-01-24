/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { fontFaces, Text } from './Text';

export const Input = styled.TextInput`
  font-size: ${props => props.fontSize || '16px'};
  font-family: ${props => fontFaces[props.fontFamily] || fontFaces.Regular};
  border: ${StyleSheet.hairlineWidth}px black;
  border-radius: 5px;
  padding: 10px;
`;

const InputContainer = styled.View`
  margin: 5px 0;
`;

const Label = styled(Text)`
  padding-left: 3px;
  font-size: 16px;
  font-family: ${props => fontFaces[props.fontFamily] || fontFaces.SemiBold};
  color: #646464;
`;

export const LabeledInput = ({ labelProps, inputProps }) => (
  <InputContainer>
    <Label {...inputProps}>{labelProps.label || 'Label'}</Label>
    <Input {...inputProps} />
  </InputContainer>
);
