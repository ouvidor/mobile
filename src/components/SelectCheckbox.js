/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components/native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Text } from './Text';
import {
  SelectContainer,
  SelectOption,
  SelectedOption,
  SelectOptionText,
  SelectLabel,
} from './Select';
import colors from '../utils/colors';

const { MarioCap, BlackSirius, SuccessGreen, Walter } = colors;

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

const SelectedContainer = styled(Text)`
  color: ${Walter};
  background: ${SuccessGreen};
`;

const Selected = props => {
  const { title = 'Title' } = props;

  return <SelectedContainer>{title}</SelectedContainer>;
};

export const SelectCheckbox = props => {
  const {
    blankOption = 'Selecione',
    options = [],
    onSelect,
    label = 'Label',
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
                const newSelection = selected;
                delete newSelection[option.value];
                setSelected({ ...selected, [option.value]: false });
              } else {
                const selectionSnapshot = selected;
                setSelected({ ...selected, [option.value]: option });
                onSelect({ ...selectionSnapshot, [option.value]: option });
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
      return blankOption;
    }
    return Object.keys(selected).map(key => {
      const option = selected[key];
      if (option) {
        return <Selected key={key} title={option.label} />;
      }
    });
  }

  return (
    <>
      <SelectLabel>{label}</SelectLabel>
      <SelectContainer>
        <SelectedOption onPress={() => setCollapsed(!collapsed)}>
          <SelectOptionText>{renderSelected()}</SelectOptionText>
          <Entypo name="select-arrows" size={21} color={BlackSirius} />
        </SelectedOption>
        {renderOptions()}
      </SelectContainer>
    </>
  );
};
