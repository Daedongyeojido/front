/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import axios from 'axios';
import styled from 'styled-components';
import TitleBar from './TitleBar';
import Button from './Button';


const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); 
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    cursor: pointer; 
`
const ModalContent = styled.div`
  background-color: #FAF9FD;
  padding: 20px 60px;
  width: 70%;
  max-width: 400px;
  height: 90%;
  max-height: 600px;
  display: flex;
  flex-direction: column;
  z-index: 1001;
  border-radius: 90px;
  scroll-behavior: auto;
  cursor: default;
  overflow-y: auto; 

  &::-webkit-scrollbar {
    display: none; 
  }
`
const CategoryButton = styled.button`
  background-color: ${props => props.selected ? '#B9D673' : '#FAF9FD'};
  color: ${props => props.selected ? 'white' : 'black'};
  width: auto;
  min-width: 30%; 
  height: 40px;
  border: ${props => props.selected ? 'none' : '1px solid #B9D673'};
  font-size: 17px;
  margin: 0px 5px 5px 0px;
  border-radius: 20px;
  padding: 0 10px;
  &:hover{
    background-color: ${props => props.selected ? 'none' : 'rgba(217, 217, 217, 0.37)'};
  }
  align-items: center;
  justify-content: center; 
`
const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content:space-around;
    margin-top: 10px;

`
const FilterModal = ({ avoidCategories ={} , setAvoidCategories , onClose }) => {
  const categories = {
    식사: ['샐러드', '샌드위치','비건 식당', '생과일 주스'],
    문화: ['미술관', '전시', '베이킹', '영화'],
    휴식: ['도서관 ', '북카페', '찻집', '공원','사찰'],
    운동: ['볼링', '클라이밍','수영','야구','사격']
  };

  const handleSeclectedPlace = (category, item) => {
    const newFilters = { ...avoidCategories  };

    if (!newFilters[category]) {
      newFilters[category] = [];
    }

    if (newFilters[category].includes(item)) {
      newFilters[category] = newFilters[category].filter(i => i !== item);
    } else {
      newFilters[category].push(item);
    }
    setAvoidCategories(newFilters);
  };

  return (
    <Modal onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <h2>장소</h2>
        <TitleBar
          width='100%'
          height='3px'
          backgroundColor='#B9D673'>
        </TitleBar>
        {Object.keys(categories).map((category) => (
          <div key={category}>
            <h3>{category}</h3>
            {categories[category].map((item) => (

              <CategoryButton
                key={item}
                selected={avoidCategories[category] && avoidCategories[category].includes(item)}
                onClick={() => handleSeclectedPlace(category, item)}
              >
                {item}
              </CategoryButton>
            ))}
          </div>
        ))}
        <ButtonContainer>
          <Button
            width= '45%'
            height= '45px'
            customStyle= 'border: 1px solid #B9D673' 
            borderRadius='30px'
            backgroundColor= 'transparent'
            fontSize="17px"
            color=' #B9D673'
            onClick={() => setAvoidCategories({})} //초기화 
              >
            초기화 </Button>
            <Button
              width = '45%'
              height= '45px'
              border= '1px solid #B9D673'
              borderRadius= '30px'
              backgroundColor='#B9D673'
              fontSize= '17px'
              color= 'white'
              onClick = {()=> {
                console.log(avoidCategories);
                onClose();
              }}>적용</Button> 
        </ButtonContainer>
      </ModalContent>
    </Modal>
  );
};
export default FilterModal;
