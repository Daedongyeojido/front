/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import Button from "./Button";

const Container = styled.div`
  width: 100%;
  height: 330px;
  background-color: white;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;
`;

const InputBox = styled.input`
  width: 85%;
  height: 50px;
  font-size: 15px;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  background-color: #eeeeee;
  border-radius: 10px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
  border: none;
  padding: 0 10px;
  margin: 10px 0;
  outline: none;
  &:focus {
    outline: none;
    border-color: #789ddd;
  }
`;

const LocationInputs = ({ startPoint, endPoint, handleInputClick, handleGo }) => (
  <Container>
    <InputBox
      placeholder="출발지를 입력해주세요"
      value={startPoint.name}
      onClick={() => handleInputClick(true)}
      readOnly
    />
    <InputBox
      placeholder="도착지를 입력해주세요"
      value={endPoint.name}
      onClick={() => handleInputClick(false)}
      readOnly
    />
    <InputBox placeholder="추천받고 싶은 않은 장소가 있어요!" />
    <Button
      fontSize="20px"
      width="60%"
      height="49px"
      borderradius="30px"
      backgroundcolor="#789DDD"
      onClick={handleGo}
    >
      GO
    </Button>
  </Container>
);

export default LocationInputs;
