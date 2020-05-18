import styled from 'styled-components/native';

const StyledContainer = styled.View`
  padding-vertical: 10px;
`;

const StyledTextField = styled.TextInput`
  font-size: 18px;
  letter-spacing: 0.6px;
  padding-left: 12px;
  padding-bottom: 6px;
  color: #ffffff;
  border-bottom-width: 1px;
  border-bottom-color: ${props => (props.valid ? '#fff' : '#f00')};
`;

const ErrorMessage = styled.Text`
  color: #f00;
`;

export { StyledTextField, StyledContainer, ErrorMessage };
