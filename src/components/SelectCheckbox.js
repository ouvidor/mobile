/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components/native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { clearEmptyKeys } from '../helpers';
import { fontFaces, Text } from './Text';
import {
  SelectContainer,
  SelectOption,
  SelectedOption,
  SelectOptionText,
  SelectLabel,
} from './Select';
import colors from '../utils/colors';

const { ErrorTextColor, BlackSirius, SuccessGreen, Walter } = colors;

const Error = styled(Text)`
  color: ${ErrorTextColor};
  padding-left: 3px;
  margin-bottom: 5px;
  font-family: ${fontFaces.SemiBoldItalic};
`;

const Check = styled(FontAwesome).attrs(props => ({
  name: props.checked ? 'check-square' : 'square-o',
}))`
  font-size: 16px;
  margin-right: 8px;
  elevation: 1;
  color: ${props => (props.checked ? SuccessGreen : BlackSirius)};
`;

const CheckboxItem = props => {
  const { checked = false, label = 'Label', onSelect = () => {} } = props;
  return (
    <SelectOption onPress={onSelect}>
      <Check checked={checked} />
      <SelectOptionText success={checked}>{label}</SelectOptionText>
    </SelectOption>
  );
};

const SelectedOptionsContainer = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
`;

const SelectedOptionBadge = styled.TouchableOpacity`
  margin: 3px;
  padding: 5px;
  border-radius: 5px;
  background: ${SuccessGreen};
`;

const SelectedOptionText = styled(Text)`
  font-size: 13px;
  font-family: ${fontFaces.Bold};
  color: ${Walter};
`;

export const SelectCheckbox = props => {
  const {
    blankOption = 'Selecione',
    options = [],
    onPress = () => {},
    onSelect,
    label = 'Label',
    errorMessage,
  } = props;
  const [collapsed, setCollapsed] = useState(true);
  const [selected, setSelected] = useState({});

  function renderOptions() {
    if (!collapsed) {
      return options.map(option => {
        return (
          <CheckboxItem
            key={option.value}
            label={option.label}
            checked={
              Object.keys(selected).includes(String(option.value)) &&
              selected[option.value]
            }
            onSelect={() => {
              if (
                Object.keys(selected).includes(String(option.value)) &&
                selected[option.value]
              ) {
                setSelected({ ...selected, [option.value]: false });
                onSelect(
                  clearEmptyKeys({ ...selected, [option.value]: false })
                );
              } else {
                const selectionSnapshot = selected;
                setSelected({ ...selected, [option.value]: option });
                onSelect(
                  clearEmptyKeys({
                    ...selectionSnapshot,
                    [option.value]: option,
                  })
                );
              }
            }}
          />
        );
      });
    }
    return null;
  }

  function renderSelected() {
    let emptyKeys = 0;
    Object.keys(selected).map(key => {
      if (!selected[key]) {
        emptyKeys += 1;
      }
    });

    if (Object.keys(selected).length === emptyKeys) {
      return <SelectOptionText>{blankOption}</SelectOptionText>;
    }

    /** Ordenando opções selecionadas por tamanho do título */
    const orderedOptions = {};
    Object.keys(selected).map(key => {
      if (selected[key]) {
        const option = selected[key];
        /** Index aqui se refere ao tamanho do título */
        const index = option.label.length;
        if (!orderedOptions[index]) {
          orderedOptions[index] = [];
        }
        orderedOptions[index].push(option);
      }
    });

    /** Renderizando opções selecionadas e reordenadas */
    return Object.keys(orderedOptions).map(key => {
      const values = orderedOptions[key];

      return values.map(option => {
        if (option) {
          return (
            <SelectedOptionBadge
              key={option.value}
              onPress={() => {
                setSelected({ ...selected, [option.value]: false });
                onSelect(
                  clearEmptyKeys({ ...selected, [option.value]: false })
                );
              }}
            >
              <SelectedOptionText>{option.label}</SelectedOptionText>
            </SelectedOptionBadge>
          );
        }
      });
    });
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
          <SelectedOptionsContainer>
            {renderSelected()}
          </SelectedOptionsContainer>
          <Entypo name="select-arrows" size={21} color={BlackSirius} />
        </SelectedOption>
        {renderOptions()}
      </SelectContainer>
      {errorMessage && collapsed && <Error>{errorMessage}</Error>}
    </>
  );
};
