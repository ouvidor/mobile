import React from 'react';

import { RatingContainer, RatingStar } from './styles';

const StarList = ({ length = 5, rate = 1, setRate, enabled = false }) => {
  return (
    <RatingContainer>
      {[...Array(length)].map((element, index) => (
        <RatingStar
          key={String(index)}
          selected={index + 1 <= rate}
          onPress={() => {
            if (enabled) {
              setRate(index + 1);
            }
          }}
        />
      ))}
    </RatingContainer>
  );
};

export default StarList;
