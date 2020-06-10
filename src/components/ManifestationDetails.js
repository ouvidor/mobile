/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components/native';
import { Text } from './index';

const statusColors = {
  2: '#87ffab',
  default: '#ececec',
};

export const ManifestationTitle = styled(Text).attrs({
  fontFamily: 'Bold',
})`
  font-size: 19px;
  margin-bottom: 20px;
`;

const SHContainer = styled.View`
  background: ${props =>
    props.status && Object.keys(statusColors).includes(props.status)
      ? statusColors[props.status]
      : statusColors.default};
`;

export const StatusHistory = ({ data }) => {
  if (!data) return null;

  const { updated_at, description, status } = data;
  console.log('Status', typeof status.id);

  return (
    <SHContainer status={status.id}>
      <Text>{description}!!!!!</Text>
    </SHContainer>
  );
};
