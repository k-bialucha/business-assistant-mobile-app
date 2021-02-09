import styled from 'styled-components/native';

import { AppTheme } from '~/models/AppTheme ';
import Colors from '~/theme/Colors';

const StyledContainer = styled.View`
  padding-vertical: 10px;
`;

interface Props {
  valid?: boolean;
}

const StyledTextField = styled.TextInput<Props>`
  font-size: 18px;
  letter-spacing: 0.6px;
  padding-left: 12px;
  padding-bottom: 6px;
  color: ${({ theme }) => {
    if (theme === AppTheme.DARK) return '#ffffff';
    else if (theme === AppTheme.LIGHT) return Colors.navyBlue;
  }};
  border-bottom-width: ${({ theme }) =>
    theme === AppTheme.LIGHT ? '2px' : '1px'};
  border-bottom-color: ${({ theme, valid }) => {
    if (!valid) return Colors.errorRed;
    else if (theme === AppTheme.DARK) return '#ffffff';
    else if (theme === AppTheme.LIGHT) return Colors.navyBlue;
  }};
`;

const ErrorMessage = styled.Text`
  color: ${Colors.errorRed};
`;

export { StyledTextField, StyledContainer, ErrorMessage };
