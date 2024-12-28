import { createGlobalStyle } from 'styled-components';
import { ThemeType } from './theme';

export const GlobalStyles = createGlobalStyle<{ theme: ThemeType }>`
  body {
    margin: 0;
    padding: 0;
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s ease;
  }
`; 