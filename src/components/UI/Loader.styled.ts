import styled from 'styled-components/native';

import Colors from '~/theme/Colors';

const StyledView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: ${Colors.navyBlue};
`;

export { StyledView };
