import styled from 'styled-components';

const TitleBar = styled.div`
    width: ${props => props.width || '100%'};
    height: ${props => props.height};
    background-color: ${props => props.backgroundColor};
    margin: ${props => props.marginBottom};
    border: ${props => props.border};
`; 

export default TitleBar;