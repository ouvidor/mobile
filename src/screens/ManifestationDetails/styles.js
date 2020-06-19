import styled from 'styled-components/native';
import { RectButton, BorderlessButton } from 'react-native-gesture-handler';

import { OutlinedButton } from '../../components';
import colors from '../../utils/colors';

export const Container = styled.View`
  margin-top: 10px;
  padding: 10px 0;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-right: 10px;
`;

export const EditButton = styled(BorderlessButton)`
  padding: 5px;
`;

export const Title = styled.Text`
  font-family: 'OpenSans-Regular';
  font-size: 22px;
`;

export const Description = styled.Text`
  font-family: 'OpenSans-Regular';
  font-size: 15px;
  margin: 10px 5px;
`;

export const ManifestationFooter = styled.View`
  margin: 10px 0;
`;

export const DateText = styled.Text`
  font-family: 'OpenSans-Italic';
  font-size: 14px;
`;

export const SectionTitle = styled.Text`
  font-family: 'OpenSans-ExtraBold';
  font-size: 26px;
  margin: 5px 0;
`;

export const AttachmentButton = styled(OutlinedButton)`
  padding: 20px;
  border-radius: 4px;
`;

export const AttachmentText = styled.Text`
  font-family: 'OpenSans-Regular';
  font-size: 18px;
`;

export const AvaliationButton = styled(RectButton)`
  align-items: center;
  padding: 20px;
  margin: 5px 0;
  border-radius: 4px;
  background: ${colors.Purple};
`;

export const AvaliationText = styled.Text`
  font-family: 'OpenSans-Regular';
  font-size: 20px;
  color: ${colors.White};
`;

export const StyledFlatList = styled.FlatList`
  margin-top: 30px;
`;

export const ModalContainer = styled.View`
  height: 50%;
  background-color: #fff;
`;

export const ModalScrollView = styled.ScrollView`
  flex: 1;
  padding: 0;
  margin: 0;
`;

export const ModalContainerContent = styled.View`
  flex: 1;
  margin-top: 10px;
  padding: 10px;
`;
