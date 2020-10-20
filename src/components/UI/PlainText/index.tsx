/**
 * Reusable Comp. that make easy to change font family for many Text Comp. in app
 *
 * textWeight determinate if font will be bold or regular (by default is regular)
 */

import React from 'react';
import { TextProps } from 'react-native';

import StyledText from './index.styled';

interface PlainTextProps extends TextProps {
  bold?: boolean;
  theme?: 'light' | 'dark';
  color?: string;
}

const PlainText: React.FC<PlainTextProps> = ({ children, ...props }) => (
  <StyledText {...props}>{children}</StyledText>
);

PlainText.defaultProps = {
  color: '#000000',
};

export default PlainText;
