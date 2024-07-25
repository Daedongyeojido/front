import React from 'react'
import styled from 'styled-components';

const InputContainer = styled.div`
    width: 80%; 
    min-width: 300px;
    height: 54px;
    background-color: #fbfbfb;
    border-radius: 30px;
    margin-bottom: 10px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 15px;
    justify-content: ${props => props.icon ? 'flex-start' : 'center'}; /* 아이콘 유무에 따라 정렬 */
    text-align: ${props => props.icon ? 'left' : 'center'};
`
const Icon = styled.img`
    margin-right: 10px; /* 아이콘과 텍스트 사이의 여백 */
`
function InputLocation({icon,text}) {
  return (
    <li style={{listStyle :'none'}}>
        <InputContainer icon={icon}>
            {icon && <Icon src={icon} alt='icon' />}
            {text}
        </InputContainer>
    </li>
  )
}

export default InputLocation
