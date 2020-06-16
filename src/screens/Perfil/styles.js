/* eslint-disable react/prop-types */
import styled from 'styled-components';

import { Text } from '../../components';

export const OuterContainer = styled.View`
  padding: 10px;
  flex: 1;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-family: 'OpenSans-ExtraBold';
  font-size: 46px;
`;

export const Label = styled(Text)`
  font-family: 'OpenSans-Regular';
  font-size: 18px;
  margin-top: 20px;
`;

export const StyledText = styled(Text)`
  font-family: 'OpenSans-Regular';
  font-size: 24px;
`;
