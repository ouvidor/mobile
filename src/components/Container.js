/* eslint-disable react/prop-types */
import React, { useRef } from 'react';
import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';
import { Text } from './Text';

const loadingAnimations = {
  default: require('../assets/animations/loading-dots.json'),
};

/**
 * @author Lucas Sousa
 * @since 2020.01.22
 * @description
 * Container padrão. Ocupa todo o espaço disponível e possui padding horizontal
 */
export const Container = styled.View`
  flex: 1;
  padding: ${props => (props.noPadding ? '0px' : '0 10px')};
`;

/**
 * @author Lucas Sousa
 * @since 2020.01.22
 * @description
 * Container com seu conteúdo centralizado vertical e horizontalmente
 */
export const CenteredContainer = styled.View`
  flex: 1;
  padding: 0 10px;
  align-items: center;
  justify-content: center;
`;

/**
 * @author Lucas Sousa
 * @since 2020.01.23
 * Container padrão com scroll. Ocupa todo o espaço disponível, assim como o <Container/>
 */
export const ScrollableContainer = styled.ScrollView.attrs({
  keyboardShouldPersistTaps: 'handled',
  contentContainerStyle: {flexGrow: 1}
})`
  flex: 1;
  padding: 0 10px;
`;

/**
 * @param {object} props
 * @author Lucas Sousa
 * @since 2020.01.27
 * @description
 * ScrollView que exibe um loading animado caso receba a props
 * loading como true.
 * É possível adicionar novos loadings baixando-os daqui: https://lottiefiles.com/
 * Baixe o JSON e coloque na pasta /assets/animations/
 * Adicionei a nova animação no objeto loadingAnimations no topo do arquivo.
 */
export const ScrollableContainerWithLoading = props => {
  const animationRef = useRef();
  const { loading, children } = props;
  if (loading) {
    return (
      <CenteredContainer onLayout={() => animationRef.current.play()}>
        <LottieView
          ref={animationRef}
          source={loadingAnimations.default}
          style={{ marginBottom: 50 }}
        />
        <Text style={{ fontSize: 15 }} fontFamily="Bold">
          Carregando...
        </Text>
      </CenteredContainer>
    );
  }
  return <ScrollableContainer>{children}</ScrollableContainer>;
};

export const ContainerWithLoading = props => {
  const animationRef = useRef();
  const { loading, children } = props;
  if (loading) {
    return (
      <CenteredContainer onLayout={() => animationRef.current.play()}>
        <LottieView
          ref={animationRef}
          source={loadingAnimations.default}
          style={{ marginBottom: 50 }}
        />
        <Text style={{ fontSize: 15 }} fontFamily="Bold">
          Carregando...
        </Text>
      </CenteredContainer>
    );
  }
  return <Container>{children}</Container>;
};
