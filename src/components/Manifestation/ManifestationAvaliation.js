/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Text } from '../Text';
import { Container } from '../Container';
import { LabeledInput } from '../Input';
import { Button } from '../Button';
import Api from '../../services/Api';

const MAX_RATE = 5;

const AvaliationContainer = styled(Container)``;
const RatingContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;
const RatingStar = styled(AntDesign).attrs(props => ({
  name: props.selected ? 'star' : 'staro',
  color: '#9762F5',
  size: 26,
}))`
  margin: 5px;
`;
const AvaliateBtn = styled(Button).attrs(props => ({
  touchableProps: {
    onPress: props.onPress,
  },
  textProps: {
    title: 'Avaliar',
    loading: props.loading,
  },
}))``;

export const Avaliation = ({ avaliation, idManifestacao }) => {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (avaliation) {
      setRating(avaliation.rate);
      setDescription(avaliation.description);
    }
  }, []);

  function renderRating() {
    const render = [];

    for (let i = 1; i <= 5; i++) {
      render.push(
        <RatingStar
          selected={i <= rating}
          onPress={() => {
            if (!avaliation) {
              setRating(i);
            }
          }}
        />
      );
    }

    return render;
  }

  function renderExistingRating() {
    return (
      <AvaliationContainer>
        <Text>Já existe avaliação!</Text>
        <RatingContainer>{renderRating()}</RatingContainer>
        <Text>{description}</Text>
      </AvaliationContainer>
    );
  }

  async function avaliar() {
    if (rating === 0) {
      return null;
    }

    setLoading(true);

    const data = {
      rate: rating,
      description,
    };

    const response = await Api.post(
      `manifestation/${idManifestacao}/avaliation`,
      data
    );
    console.log(response);

    setLoading(false);
  }

  return (
    <AvaliationContainer>
      {avaliation && renderExistingRating()}
      {!avaliation && (
        <>
          <RatingContainer>{renderRating()}</RatingContainer>
          <LabeledInput
            label="Sua avaliação"
            inputProps={{
              multiline: true,
              autoCorrect: false,
              value: description,
              onChangeText: setDescription,
              // errorMessage: error,
              // onFocus: () => setError(null),
            }}
          />
          <AvaliateBtn loading={loading} onPress={avaliar} />
        </>
      )}
    </AvaliationContainer>
  );
};
