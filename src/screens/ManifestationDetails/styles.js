import styled from 'styled-components/native';
import { OutlinedButton } from '../../components';

export const Container = styled.View`
  margin-top: 10px;
  padding: 10px 0;
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
  margin: 20px;
  border-radius: 4px;
`;

export const AttachmentText = styled.Text`
  font-family: 'OpenSans-Regular';
  font-size: 18px;
`;

export const StyledFlatList = styled.FlatList`
  margin-top: 30px;
`;
