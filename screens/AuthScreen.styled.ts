import styled from 'styled-components/native';

const StyledView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: papayawhip;
`;

const StyledText = styled.Text`
  color: ${props => (props.success ? 'green' : 'cadetblue')};
  padding: 5px 22px;
  margin-vertical: 5px;
  font-size: 24px;
`;

const StyledInputContainer = styled.View`
  width: 60%;
  height: 30px;
  border-bottom-width: 3px;
  border-bottom-color: palevioletred;
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
};
