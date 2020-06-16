import styled from 'styled-components';
import { Text } from '../../components';

export const ItemContainer = styled.View`
  padding: 40px 20px;
`;

export const ItemMenu = styled(Text)`
  font-size: 24px;
  margin: 10px 0;
  color: ${({ red }) => (red ? '#d00' : '#000')};
`;
