import styled from 'styled-components/native';

import Colors from '../theme/Colors';

const StyledContainer = styled.View`
  flex: 1;
  align-items: center;
  padding: 20px;
  background-color: ${Colors.navyBlue};
`;

const StyledWideContainer = styled.View`
  width: 100%;
  margin-vertical: 5px;
`;

export { StyledContainer, StyledWideContainer };
