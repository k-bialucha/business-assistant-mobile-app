import styled from 'styled-components/native';

import Colors from '../theme/Colors';

const StyledView = styled.View`
  flex: 1;
  padding: 20px;
  align-items: center;
  background-color: ${Colors.navyBlue};
`;

const StyledText = styled.Text`
  color: ${props => (props.success ? 'green' : Colors.gray)};
  padding: 5px 22px;
  margin-vertical: 5px;
  font-size: 24px;
`;

const StyledWideContainer = styled.View`
  width: 100%;
  margin-vertical: 5px;
`;

const StyledInputContainer = styled.View`
  width: 60%;
  height: 30px;
  border-bottom-width: 3px;
  border-bottom-color: ${Colors.silver};
  margin-vertical: 5px;
`;

const StyledInput = styled.TextInput`
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 20px;
`;

const StyledButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 70%;
  margin-vertical: 10px;
`;

export {
  StyledView,
  StyledText,
  StyledInput,
  StyledInputContainer,
  StyledButtonsContainer,
  StyledWideContainer,
};
