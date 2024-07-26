/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import Button from "./Button";
import Departure from '../Image/DepartureImg.png';
import Arrival from '../Image/ArrivalImg.png';

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

const InputContainer = styled.div`
  width: 85%;
  height: 50px;
  background-color: #eeeeee;
  border-radius: 10px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 15px;
  margin: 10px 0;
`;

const Icon = styled.img`
  margin-right: 10px;
  width: 20px;
  height: 20px;
`;

const InputBox = styled.input`
  width: 100%;
  height: 100%;
  font-size: 15px;
  background-color: transparent;
  border: none;
  outline: none;
  &:focus {
    border-color: #789ddd;
  }
`;

const LocationInputs = ({ startPoint, endPoint, handleInputClick, handleGo }) => {
  const isInputComplete = startPoint.name && endPoint.name;

  return (
    <Container>
      <InputContainer>
        <Icon src={Departure} alt="출발" />
        <InputBox
          placeholder="출발지를 입력해주세요"
          value={startPoint.name}
          onClick={() => handleInputClick(true)}
          readOnly
        />
      </InputContainer>
      <InputContainer>
        <Icon src={Arrival} alt="도착" />
        <InputBox
          placeholder="도착지를 입력해주세요"
          value={endPoint.name}
          onClick={() => handleInputClick(false)}
          readOnly
        />
      </InputContainer>
      <InputContainer>
        <InputBox placeholder="추천받고 싶은 않은 장소가 있어요!" />
      </InputContainer>
      <Button
        fontSize="20px"
        width="60%"
        height="49px"
        borderradius="30px"
        backgroundColor={isInputComplete ? "#789DDD" : "#CCCCCC"}
        onClick={handleGo}
        disabled={!isInputComplete}
      >
        GO
      </Button>
    </Container>
  );
};

export default LocationInputs;