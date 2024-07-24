import React from 'react'
import styled from 'styled-components';

const InputContainer = styled.div`
    width: 280px;
    height: 54px;
    background-color: #fbfbfb;
    border-radius: 30px;
    border: 1px solid black;
    margin-bottom: 10px;
`

function InputLocation() {
  return (
    <li style={{listStyle :'none'}}>
      <InputContainer></InputContainer>
    </li>
  )
}

export default InputLocation
