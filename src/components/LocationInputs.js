/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import Button from "./Button";
import Departure from '../Image/DepartureImg.png';
import Arrival from '../Image/ArrivalImg.png';
import { useNavigate } from "react-router-dom";

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
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  width: 85%;
  height: 50px;
  background-color: ${props => props.backgroundColor || '#FBFBFB'};
  border-radius: 30px;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 15px;
  margin: 10px;
`;

const Icon = styled.img`
  margin-right: 10px;
  width: 20px;
  height: 20px;
`;

const InputBox = styled.input`
  font-family: 'IBM Plex Sans KR', sans-serif;
  width: 100%;
  height: 100%;
  font-size: 15px;
  background-color: transparent;
  border: none;
  outline: none;
  &:focus {
    border-color: #B9D673;
  }
`;

const LocationInputs = ({ startPoint, endPoint, avoidPlaces, handleInputClick, handleFilterModal }) => {
  const navigate = useNavigate();

  const handleGo = () => {
    if (startPoint.name && endPoint.name) {
      navigate('/map', { 
        state: { 
          startPoint,
          endPoint,
          avoidPlaces
        } 
      });
    }

  };

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

      <InputContainer backgroundColor='#EEEEEE'>
        <Icon src={Arrival} alt="도착" />
        <InputBox
          placeholder="추천받고 싶은 않은 장소가 있어요! (선택)"
          value={avoidPlaces.item}
          onClick={handleFilterModal}
          readOnly
        />
      </InputContainer>

      <Button
        fontSize="20px"
        width="60%"
        height="49px"
        borderradius="30px"
        backgroundColor={startPoint.name && endPoint.name ? "#B9D673" : "#CCCCCC"}
        onClick={handleGo}
        disabled={!startPoint.name || !endPoint.name}
        
      >
        GO
      </Button>
    </Container>

  );
};

export default LocationInputs;