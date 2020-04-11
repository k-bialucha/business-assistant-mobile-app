import styled from 'styled-components/native';

import Colors from '../theme/Colors';

const StyledContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: ${Colors.navyBlue};
`;

const StyledLarge = styled.Text`
  padding-vertical: 20px;
  font-size: 42px;
  font-weight: bold;
  color: #ffffff;
`;

const StyledButtonsContainer = styled.View`
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const StyledWideContainer = styled.View`
  width: 100%;
  margin-vertical: 5px;
`;

const StyledLink = styled.Text`
  color: ${Colors.silver};
  font-weight: bold;
`;

const StyledText = styled.Text`
  color: #ffffff;
`;

const StyledLoginTextContainer = styled.View`
  padding-vertical: 20px;
`;

export {
  StyledLarge,
  StyledContainer,
  StyledButtonsContainer,
  StyledWideContainer,
  StyledLink,
  StyledText,
  StyledLoginTextContainer,
};
