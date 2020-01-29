/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { fontFaces, Text } from './Text';
import colors from '../utils/colors';

const { MarioCap, BlackSirius, SuccessGreen } = colors;

const SelectContainer = styled.View`
  min-height: 50px;
  padding: 10px;
  justify-content: center;
  border: ${StyleSheet.hairlineWidth}px;
  border-color: ${props => (props.errorMessage ? MarioCap : BlackSirius)};
  border-radius: 5px;
  margin: 5px 0;
  elevation: 1;
`;

const SelectedOption = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  flex-direction: row;
  justify-content: center;
  margin: 5px 0;
`;

const SelectOption = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin: 5px 0;
`;

const SelectOptionText = styled(Text)`
  flex: 1;
  font-size: 16px;
  color: ${props => (props.success ? SuccessGreen : BlackSirius)};
`;

const Check = styled(FontAwesome).attrs(props => ({
  name: props.checked ? 'check-square' : 'square-o',
}))`
  font-size: 16px;
  margin-right: 8px;
  elevation: 1;
  color: ${props => (props.checked ? SuccessGreen : BlackSirius)};
`;

const SelectCheckbox = props => {
  const { checked = false, label = 'Label', onSelect = () => {} } = props;
  const [checkedState, setCheckedState] = useState(checked);
  return (
    <SelectOption
      onPress={() => {
        setCheckedState(!checkedState);
        onSelect();
      }}
    >
      <Check checked={checkedState} />
      <SelectOptionText success={checkedState}>{label}</SelectOptionText>
    </SelectOption>
  );
};

const SelectLabel = styled(Text)`
  padding-left: 3px;
  font-size: 16px;
  font-family: ${props => fontFaces[props.fontFamily] || fontFaces.SemiBold};
  color: ${props => (props.errorMessage ? MarioCap : BlackSirius)};
`;

export const Select = props => {
  const {
    multiple = false,
    blankOption = 'Selecione',
    options,
    onSelect,
    label = 'Label',
  } = props;
  const [collapsed, setCollapsed] = useState(true);
  const [selected, setSelected] = useState();
  const [selectedOptions, setSelectedOptions] = useState([]);

  function renderOptions() {
    if (!collapsed) {
      return options.map(option => {
        if (option.label !== selected) {
          if (multiple) {
            return (
              <SelectCheckbox
                checked={selectedOptions.includes(option.value)}
                key={option.value}
                label={option.label}
                onSelect={() => {
                  if (selectedOptions.includes(option.value)) {
                    setSelected(
                      selectedOptions.filter(value => value !== option.value)
                    );
                  } else {
                    setSelectedOptions([...selectedOptions, option.value]);
                  }
                }}
              />
            );
          }
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
      <SelectLabel>{label}</SelectLabel>
      <SelectContainer>
        <SelectedOption onPress={() => setCollapsed(!collapsed)}>
          <SelectOptionText>{selected || blankOption}</SelectOptionText>
          <Entypo name="select-arrows" size={21} color={BlackSirius} />
        </SelectedOption>
        {renderOptions()}
      </SelectContainer>
    </>
  );
};
