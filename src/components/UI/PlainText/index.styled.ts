import styled, { css } from 'styled-components/native';

import Colors from '~/theme/Colors';

export default styled.Text`
  ${({ color, theme }) => {
    if (color || theme) {
      let value;

      if (theme) {
        if (theme === 'light') value = Colors.silver;
        if (theme === 'dark') value = Colors.navyBlue;
      }

      if (color) value = color;

      return css`
        color: ${value};
      `;
    }

    return null;
  }}
  font-weight: ${({ bold }) => (bold && 'bold') || 'normal'}
`;
