/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components/native';
import { Text, fontFaces } from './Text';

const ManifestationTipoContainer = styled.View`
  align-self: flex-start;
  padding: 5px 10px;
  background: red;
  border-radius: 5px;
  margin: 2px 0;
`;
const ManifestationTipoNome = styled(Text).attrs(() => ({
  numberOfLines: 1,
}))`
  font-family: ${fontFaces.Bold};
  color: #fff;
`;

export const ManifestationTipoTag = ({ children }) => {
  return (
    <ManifestationTipoContainer>
      <ManifestationTipoNome>{children}</ManifestationTipoNome>
    </ManifestationTipoContainer>
  );
};
