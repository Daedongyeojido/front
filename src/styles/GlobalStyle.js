import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  * {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    background-color: white;
    height: 100%;
  }

  .ibm-plex-sans-kr-regular {
    font-family: "IBM Plex Sans KR", sans-serif;
    font-style: normal;
  }

  #root {
    height: 100%;
    display: flex;
    justify-content: center;
  }
`;

export default GlobalStyle;
