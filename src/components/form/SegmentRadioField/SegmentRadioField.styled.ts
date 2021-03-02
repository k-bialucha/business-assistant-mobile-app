import styled from 'styled-components/native';

const StyledView = styled.View`
  display: 'flex';
  width: '100%';
  flex-direction: 'row';
  padding-top: 18;
  padding-bottom: 12;
`;

const StyledTouchableOpacity = styled.TouchableOpacity`
  display: 'flex';
  flex: 1;
  border-width: 3;
  align-items: 'center';
  padding-vertical: 8;
  padding-horizontal: 2;
`;

const StyledText = styled.Text`
  font-size: 18;
  letter-spacing: 0.6;
`;

export { StyledView, StyledTouchableOpacity, StyledText };
