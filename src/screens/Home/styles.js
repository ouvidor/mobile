import styled from 'styled-components';

import colors from '../../utils/colors';

const { globalColors } = colors;

export const NotificationContainer = styled.TouchableOpacity`
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 10px;
  height: 60px;
  width: 60px;
  background-color: ${globalColors.primaryColor};
  border-radius: 100px;
  align-items: center;
  justify-content: center;
  z-index: 99;
`;

export const NotificationContent = styled.View`
  flex: 1;
  position: relative;
  align-items: center;
  justify-content: center;
`;

export const NotificationCount = styled.View`
  position: absolute;
  top: -13px;
  right: -23px;

  height: 25px;
  width: 25px;
  background-color: #fff;
  border: 1px solid ${globalColors.primaryColor};
  border-radius: 100px;
  align-items: center;
  justify-content: center;
`;
