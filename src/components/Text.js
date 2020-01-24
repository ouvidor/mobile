import styled from 'styled-components/native';

/**
 * @const fontFaces
 * @description
 * Mapeamento para facilitar o uso de fontes.
 * É possível, por exemplo, passar uma props fontFamily='BoldItalic' para Text,
 * e Text utilizará a fonte OpenSans-BoldItalic.
 */
export const fontFaces = {
  Bold: 'OpenSans-Bold',
  BoldItalic: 'OpenSans-BoldItalic',
  ExtraBold: 'OpenSans-ExtraBold',
  ExtraBoldItalic: 'OpenSans-ExtraBoldItalic',
  Italic: 'OpenSans-Italic',
  Light: 'OpenSans-Light',
  LightItalic: 'OpenSans-LightItalic',
  Regular: 'OpenSans-Regular',
  SemiBold: 'OpenSans-SemiBold',
  SemiBoldItalic: 'OpenSans-SemiBoldItalic',
};

/**
 * @author Lucas Sousa
 * @since 2020.01.23
 * @description
 * Componente base de texto.
 * Aceita a props fontFamily para alterar a fonte utilizada, desde que
 * fontFamily possa ser mapeada a uma fonte em fontFaces.
 */
export const Text = styled.Text`
  color: black;
  font-family: ${props => fontFaces[props.fontFamily] || fontFaces.Regular};
`;
