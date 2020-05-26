import styled from 'styled-components/native';

import Colors from '../../theme/Colors';

const StyledContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: ${Colors.navyBlue};
`;

const StyledLargeText = styled.Text`
  padding-vertical: 20px;
  font-size: 42px;
  font-weight: bold;
  color: #ffffff;
`;

const StyledButtonsContainer = styled.View`
  align-items: center;
  width: 100%;
`;

const StyledWideContainer = styled.View`
  width: 100%;
  margin-vertical: 5px;
`;

const StyledLoginTextContainer = styled.View`
  padding-vertical: 20px;
`;

export {
  StyledLargeText,
  StyledContainer,
  StyledButtonsContainer,
  StyledWideContainer,
  StyledLoginTextContainer,
};
