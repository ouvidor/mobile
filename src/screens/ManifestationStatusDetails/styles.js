import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import colors from '../../utils/colors';

export const Container = styled.ScrollView.attrs({
  keyboardShouldPersistTaps: 'handled',
  contentContainerStyle: { flexGrow: 1 },
})`
  flex: 1;
  padding: 40px 10px;
`;

export const SectionTitle = styled.Text`
  font-family: 'OpenSans-Bold';
  font-size: 28px;
`;

export const SubSectionTitle = styled(SectionTitle)`
  font-size: 20px;
  margin-top: 10px;
`;

export const Description = styled.Text`
  font-family: 'OpenSans-Regular';
  font-size: 18px;
`;

export const Date = styled.Text`
  font-family: 'OpenSans-Italic';
  font-size: 16px;
  margin-top: 30px;
`;

export const AttachmentButton = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin: 5px 0;
  border-radius: 4px;
  background: ${colors.Purple};
`;

export const AttachmentButtonText = styled(Description)`
  font-size: 22px;
  margin-left: 5px;
  color: ${colors.White};
`;
