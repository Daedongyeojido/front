import React from 'react'
import styled from 'styled-components';
import TitleBar from './TitleBar';
import { object } from 'prop-types';
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
`

const CategoryButton = styled.button`
  background-color: ${props => props.selected ? '#789DDD' : '#FAF9FD'};
  color: ${props => props.selected ? 'white' : 'black'};
  width: 30%;
  height: 40px;
  border: ${props => props.selected ? 'none' : '1px solid #789DDD'};
  font-size: 17px;
  margin: 0px 5px 5px 0px;
  border-radius: 20px;
  &:hover{
    background-color: rgba(217, 217, 217, 0.37);
  }
`
const FilterModal = ({ selectedFilters, setSelectedFilters }) => {
  const categories = {
    식사: ['샐러드', '포케'],
    문화: ['미술관', '전시', '음악', '공방'],
    휴식: ['공원','둘레길','사찰','도서관']
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

  return (
    <Modal>
      <ModalContent>
        <h2>장소</h2>
        <TitleBar
          width='100%'
          height='3px'
          backgroundColor='#789DDD'>
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

      </ModalContent>
    </Modal>
  );
};
export default FilterModal;
