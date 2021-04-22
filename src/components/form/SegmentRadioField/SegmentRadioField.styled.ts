import styled from 'styled-components/native';

import { AppTheme } from '~/models/AppTheme ';
import Colors from '~/theme/Colors';

const StyledView = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;
  padding-top: 18px;
  padding-bottom: 12px;
`;

const StyledTouchableOpacity = styled.TouchableOpacity<{
  appTheme?: AppTheme;
  color: string;
  isSelected: boolean;
}>`
  background-color: ${({ appTheme, isSelected }) => {
    if (!isSelected) {
      return 'transparent';
    }

    return appTheme === AppTheme.DARK ? Colors.navyBlue : '#ffffff';
  }};
  border-color: ${({ color, isSelected }) =>
    isSelected ? color : Colors.silver};
  display: flex;
  flex: 1;
  border-width: 3px;
  align-items: center;
  padding-vertical: 8px;
  padding-horizontal: 2px;
`;

const StyledText = styled.Text<{
  color: string;
  isSelected: boolean;
}>`
  color: ${({ color, isSelected }) => (isSelected ? color : Colors.gray)};
  font-size: 18px;
  letter-spacing: 0.6px;
`;

export { StyledView, StyledTouchableOpacity, StyledText };
