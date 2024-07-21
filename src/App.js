import React, { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import RoutesSetting from './utils/route/Routes';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import theme from './utils/theme/theme';

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