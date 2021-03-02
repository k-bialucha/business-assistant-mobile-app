import styled from 'styled-components/native';

const StyledView = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;
  padding-top: 18px;
  padding-bottom: 12px;
`;

const StyledTouchableOpacity = styled.TouchableOpacity`
  display: flex;
  flex: 1;
  border-width: 3px;
  align-items: center;
  padding-vertical: 8px;
  padding-horizontal: 2px;
`;

const StyledText = styled.Text`
  font-size: 18px;
  letter-spacing: 0.6px;
`;

export { StyledView, StyledTouchableOpacity, StyledText };
