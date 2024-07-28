import styled from 'styled-components';

const TitleBar = styled.div`
    /* width: 2.5px; */
    width: ${props => props.width || '100%'};
    /* height: 42px; */
    height: ${props => props.height};
    /* background-color: #575757; */
    background-color: ${props => props.backgroundColor};
    /* margin: 3px 15px 0px 0px; */
    margin: ${props => props.marginBottom};
`; 

export default TitleBar;