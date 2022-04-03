import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
html,
body {
  padding: 0;
  margin: 0;
  background-color: ${(props) => props.theme.colors.backgroundColor};
  color: ${(props) => props.theme.colors.FontColor};
  font-family: 'Poppins', sans-serif !important;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}
`;
