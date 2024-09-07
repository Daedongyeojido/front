import styled from 'styled-components';

export const PageContainer = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const ContentContainer = styled.div`
  flex: 1;
  padding: 50px;
  position: relative;
  z-index: 1;
`;