import styled from 'styled-components/native';

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
})`
  flex: 1;
  padding: 0 10px;
`;
