import React, { useState, useEffect } from 'react';
import { showMessage } from 'react-native-flash-message';

import Api from '../../services/Api';
import { LabeledInput } from '../Input';
import { Text } from '../Text';
import StarList from './StarList';
import {
  AvaliateBtn,
  AvaliationContainer,
  RatingContainer,
  Title,
} from './styles';

const Avaliation = ({ avaliation, manifestationId }) => {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (avaliation) {
      setRating(avaliation.rate);
      setDescription(avaliation.description);
    }
  }, []);

  async function handleAvaliation() {
    if (rating === 0) {
      showMessage({
        message: 'Avaliação inválida!',
        type: 'danger',
        icon: { icon: 'danger', position: 'left' },
        duration: 2000,
      });
      return;
    }

    setLoading(true);

    const data = {
      rate: rating,
      description,
    };

    const response = await Api.post(
      `manifestation/${manifestationId}/avaliation`,
      data
    );
    console.log(response);

    if ('status' in response || 'error' in response) {
      showMessage({
        message: response.message || response.messages.join(', '),
        type: 'danger',
        icon: { icon: 'danger', position: 'left' },
        duration: 2000,
      });
      return;
    }

    setLoading(false);
    showMessage({
      message: 'Avaliação feita!',
      type: 'success',
      icon: { icon: 'success', position: 'left' },
      duration: 2000,
    });
  }

  return (
    <AvaliationContainer>
      {avaliation && (
        <AvaliationContainer>
          <Text>Já existe avaliação!</Text>
          <RatingContainer>
            <StarList rate={rating} setRate={setRating} />
          </RatingContainer>
          <Text>{description}</Text>
        </AvaliationContainer>
      )}
      {!avaliation && (
        <AvaliationContainer>
          <Title>Avaliação</Title>
          <RatingContainer>
            <StarList rate={rating} setRate={setRating} enabled />
          </RatingContainer>
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
          <AvaliateBtn loading={loading} onPress={handleAvaliation} />
        </AvaliationContainer>
      )}
    </AvaliationContainer>
  );
};

export default Avaliation;
