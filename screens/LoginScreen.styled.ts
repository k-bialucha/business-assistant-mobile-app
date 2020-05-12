import styled from 'styled-components/native';

import Colors from '../theme/Colors';

const StyledView = styled.View`
  flex: 1;
  padding: 20px;
  align-items: center;
  background-color: ${Colors.navyBlue};
`;

const StyledWideContainer = styled.View`
  width: 100%;
  margin-vertical: 5px;
`;

export { StyledView, StyledWideContainer };
