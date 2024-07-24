import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 350px;
    margin-bottom: 20px;
`
const Circle = styled.div`
    width: 23px;
    height: 23px;
    background-color: #575757;
    border-radius: 30px;
    color: white;
    font-size: 14px;
    font-size: 20px;
    margin: 4px 30px 0px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Explanation = styled.div`
    font-size: 17px;
    line-height: 1.5;
    white-space: pre-line;
`
function TutorialItem(props) {
  return (
    <li style={{listStyle: 'none'}}>
        <Container>
            <Circle>{props.number}</Circle>
            <Explanation>{props.content}</Explanation>
        </Container>
    </li>
  )
}
export default TutorialItem;
