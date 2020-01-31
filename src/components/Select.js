/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import Entypo from 'react-native-vector-icons/Entypo';
import { fontFaces, Text } from './Text';
import colors from '../utils/colors';

const {
  ErrorTextColor,
  ErrorBackground,
  BlackSirius,
  SuccessGreen,
  Walter,
} = colors;

const Error = styled(Text)`
  color: ${ErrorTextColor};
  padding-left: 3px;
  margin-bottom: 5px;
  font-family: ${fontFaces.SemiBoldItalic};
`;

export const SelectContainer = styled.View`
  min-height: 50px;
  padding: 10px;
  justify-content: center;
  border: ${StyleSheet.hairlineWidth}px;
  border-color: ${props =>
    props.errorMessage ? ErrorBackground : BlackSirius};
  background: ${props => (props.errorMessage ? ErrorBackground : Walter)};
  border-radius: 5px;
  margin: 5px 0;
  elevation: 1;
`;

export const SelectedOption = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  flex-direction: row;
  justify-content: center;
  margin: 5px 0;
`;

export const SelectOption = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin: 5px 0;
`;

export const SelectOptionText = styled(Text)`
  flex: 1;
  font-size: 16px;
  color: ${props => (props.success ? SuccessGreen : BlackSirius)};
`;

export const SelectLabel = styled(Text)`
  padding-left: 3px;
  font-size: 16px;
  font-family: ${props => fontFaces[props.fontFamily] || fontFaces.SemiBold};
  color: ${props => (props.errorMessage ? ErrorTextColor : BlackSirius)};
`;

export const Select = props => {
  const {
    blankOption = 'Selecione',
    options = {},
    onPress = () => {},
    onSelect,
    label = 'Label',
    errorMessage,
  } = props;
  const [collapsed, setCollapsed] = useState(true);
  const [selected, setSelected] = useState();

  function renderOptions() {
    if (!collapsed) {
      return options.map(option => {
        if (option.label !== selected) {
          return (
            <SelectOption
              key={option.value}
              onPress={() => {
                setSelected(option.label);
                setCollapsed(!collapsed);
                onSelect(option);
              }}
            >
              <SelectOptionText>{option.label}</SelectOptionText>
            </SelectOption>
          );
        }
        return null;
      });
    }
    return null;
  }

  return (
    <>
      <SelectLabel errorMessage={errorMessage && collapsed}>
        {label}
      </SelectLabel>
      <SelectContainer errorMessage={errorMessage && collapsed}>
        <SelectedOption
          onPress={() => {
            setCollapsed(!collapsed);
            onPress();
          }}
        >
          <SelectOptionText>{selected || blankOption}</SelectOptionText>
          <Entypo name="select-arrows" size={21} color={BlackSirius} />
        </SelectedOption>
        {renderOptions()}
      </SelectContainer>
      {errorMessage && collapsed && <Error>{errorMessage}</Error>}
    </>
  );
};
