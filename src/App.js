import React, { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import RoutesSetting from './utils/route/Routes';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import theme from './utils/theme/theme';
import { Helmet, HelmetProvider } from 'react-helmet-async';


const AppContainer = styled.div`
  max-width: 480px;
  width: 100%;
  min-height: 100%;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <HelmetProvider>
        <Helmet>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@100;200;300;400;500;600;700&display=swap"
          />
        </Helmet>
        </HelmetProvider>
        <GlobalStyle />
        <AppContainer>
          <Suspense fallback={<div />}>
            <RoutesSetting />
          </Suspense>
        </AppContainer>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;