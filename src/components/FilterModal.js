/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
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
`
const CategoryButton = styled.button`
  background-color: ${props => props.selected ? '#B9D673' : '#FAF9FD'};
  color: ${props => props.selected ? 'white' : 'black'};
  width: 30%;
  height: 40px;
  border: ${props => props.selected ? 'none' : '1px solid #B9D673'};
  font-size: 17px;
  margin: 0px 5px 5px 0px;
  border-radius: 20px;
  &:hover{
    background-color: ${props => props.selected ? 'none' : 'rgba(217, 217, 217, 0.37)'};
  }
`
const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content:space-around;
    margin-top: 10px;

`
const FilterModal = ({ selectedFilters, setSelectedFilters, onClose }) => {
  const categories = {
    식사: ['샐러드', '포케'],
    문화: ['미술관', '전시', '음악', '공방'],
    휴식: ['공원', '둘레길', '사찰', '도서관']
  };

  const handleSeclectedPlace = (category, item) => {
    const newFilters = { ...selectedFilters };

    if (!newFilters[category]) {
      newFilters[category] = [];
    }

    if (newFilters[category].includes(item)) {
      newFilters[category] = newFilters[category].filter(i => i !== item);
    } else {
      newFilters[category].push(item);
    }
    setSelectedFilters(newFilters);
  };

  const AvoidPlaces = (places) => {
    if(places) {
      
    }

  }

  return (
    <Modal>
      <ModalContent>
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
                selected={selectedFilters[category] && selectedFilters[category].includes(item)}
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
            onClick='' //초기화 
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
              onClick = {console.log('clicked!')}>적용</Button> 
              {/* 여기 키워드 넘겨주는 로직 작업 및 이름 수정  */}
              AvoidPlaces([제외된 장소들 ])
              이거 submit 버튼? 으로 해야 할 듯 
              onSubmit=''

        </ButtonContainer>
      </ModalContent>
    </Modal>
  );
};
export default FilterModal;
