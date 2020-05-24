import styled, { css } from 'styled-components/native';

import Colors from '../../../theme/Colors';

export default styled.Text`
  ${({ color, light, dark }) => {
    if (color || light || dark) {
      let value;

      if (light) value = Colors.silver;
      if (dark) value = Colors.navyBlue;
      if (color) value = color;

      return css`
        color: ${value};
      `;
    }
  }}
  font-weight: ${({ bold }) => (bold && 'bold') || 'normal'}
`;
