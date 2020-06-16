/* eslint-disable react/prop-types */
import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';
import { Text, fontFaces } from './Text';
import { ManifestationTipoTag } from './Tags';
import { OutlinedButton } from './Button';
import statusManifestation from '../utils/status';

const Container = styled.View.attrs({})``;
const Gradient = styled(LinearGradient).attrs({
  colors: ['#ffffff', '#ececec'],
})`
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  elevation: 5;
`;

const HistoricContainer = ({ children }) => {
  return (
    <Container>
      <Gradient>{children}</Gradient>
    </Container>
  );
};

const CardHeaderLeft = styled.View`
  flex: 1.5;
`;

const CardHeaderRight = styled.View`
  flex: 1;
  align-items: flex-end;
`;

const ManifestationTitle = styled(Text).attrs(() => ({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
}))`
  font-size: 16px;
  font-family: ${fontFaces.ExtraBold};
  margin-bottom: 2px;
`;

/** ManifestationTypes */
const MTContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexDirection: 'row',
  },
  showsHorizontalScrollIndicator: false,
  horizontal: true,
})``;
const MTItem = styled.View`
  background: #f3e6ff;
  align-self: flex-start;
  padding: 3px 6px;
  margin-right: 2px;
  border-radius: 5px;
`;
const MTTitle = styled(Text).attrs({
  fontFamily: 'SemiBold',
})`
  font-size: 14px;
`;

const ManifestationTypes = ({ types }) => {
  function renderItems() {
    const toRender = [];

    for (let i = 0; i < 5; i++) {
      toRender.push(
        <MTItem key={i}>
          <MTTitle>Type</MTTitle>
        </MTItem>
      );
    }

    return toRender;
  }

  return <MTContainer>{renderItems()}</MTContainer>;
};

const FooterContainer = styled.View`
  margin-top: 10px;
  flex-direction: row;
`;
const FooterText = styled(Text).attrs({
  fontFamily: 'SemiBoldItalic',
})`
  font-size: 12px;
`;

const Footer = ({ children }) => {
  return <FooterContainer>{children}</FooterContainer>;
};

const HistoricLista = styled.FlatList.attrs({
  showVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 0 },
})``;

export const HistoricList = props => {
  const { manifestations = {}, navigation, handleNextPage } = props;

  return (
    <HistoricLista
      data={manifestations}
      keyExtractor={item => String(item.id)}
      onEndReachedThreshold={0.01}
      onEndReached={handleNextPage}
      renderItem={({ item }) => {
        const date = new Date(item.updated_at);
        const data = date.toLocaleDateString();
        const hora = date.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

        return (
          <HistoricContainer>
            <ManifestationTitle>{item.title}</ManifestationTitle>
            <ManifestationTypes>{item.types_id}</ManifestationTypes>
            <Footer>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <FooterText>
                  Última atualização {data} às {hora}
                </FooterText>
                <Feather
                  name="arrow-right"
                  size={21}
                  onPress={() =>
                    navigation.navigate('ManifestacaoDetalhes', {
                      id: item.id,
                    })
                  }
                />
              </View>
            </Footer>
          </HistoricContainer>
        );
      }}
    />
  );
};
