/* eslint-disable react/prop-types */
import styled from 'styled-components';
import colors from '../../utils/colors';

import { Text } from '../../components';

const { globalColors } = colors;

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

export const ContainerFilter = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

export const ButtonFilter = styled.TouchableOpacity`
  flex: 1;
  height: 40px;
  padding: 20px;
  margin: 20px;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: ${globalColors.primaryColor};
  border-radius: 5px;
  border: 5px solid
    ${props =>
      props.selected === props.id
        ? colors.LightBlue
        : globalColors.primaryColor};
`;

export const TextFilter = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 18px;
`;

export const Empty = styled.Text`
  align-self: center;
  margin: 10px;
  font-size: 18px;
`;
