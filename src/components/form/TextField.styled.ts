import styled from 'styled-components/native';

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
  color: #ffffff;
  border-bottom-width: 1px;
  border-bottom-color: ${props => (props.valid ? '#ffffff' : Colors.errorRed)};
`;

const ErrorMessage = styled.Text`
  color: ${Colors.errorRed};
`;

export { StyledTextField, StyledContainer, ErrorMessage };
