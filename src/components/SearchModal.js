/* eslint-disable react/prop-types */
import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Button from "./Button";

const ModalOverlay = styled.div`
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
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 400px;
  max-height: 600px;
  display: flex;
  flex-direction: column;
  z-index: 1001;`;

const MapContainer = styled.div`
  width: 100%;
  height: 200px;
  margin-bottom: 10px;
  flex-shrink: 0;
`;

const InputBox = styled.input`
  width: 100%;
  height: 50px;
  font-size: 15px;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  background-color: #eeeeee;
  border-radius: 10px;
  border: none;
  padding: 0 10px;
  margin: 10px 0;
  outline: none;
  &:focus {
    outline: none;
    border-color: #789ddd;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: ${(props) => props.isSearched ? "space-between" : "center"};
  width: 100%;
  flex-shrink: 0;
`;

const SearchResultContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  margin-top: 10px;
`;

const SearchResult = styled.div`
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid #eee;
  &:hover {
    background-color: #f0f0f0;
  }
  &:last-child {
    border-bottom: none;
  }
`;

const SearchModal = ({
  searchKeyword,
  setSearchKeyword,
  handleSearch,
  isSearched,
  handleConfirmSelection,
  selectedPlace,
  searchResults,
  handlePlaceSelect,
  onClose
}) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleTouchStart = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleTouchStart);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, [onClose]);

  return (

  <ModalOverlay>
    <ModalContent ref={modalRef}>
      <MapContainer id="map" />
      <InputBox
        placeholder="장소를 검색하세요"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      <ButtonGroup isSearched={isSearched}>
        <Button
          onClick={handleSearch}
          width={isSearched ? "48%" : "100%"}
          height="45px"
          fontSize="15px"
          marginTop="5px"
          marginBottom="5px"
        >
          {isSearched ? "재검색" : "검색"}
        </Button>
        {isSearched && (
          <Button
            onClick={handleConfirmSelection}
            disabled={!selectedPlace}
            width="48%"
            height="45px"
            fontSize="15px"
            backgroundColor={selectedPlace ? "#789DDD" : "#EEEEEE"}
            color="white"
            marginTop="5px"
            marginBottom="5px"
          >
            선택
          </Button>
        )}
      </ButtonGroup>
      <SearchResultContainer>
        {searchResults.map((place) => (
          <SearchResult
            key={place.id}
            onClick={() => handlePlaceSelect(place)}
            style={{
              backgroundColor:
                selectedPlace && selectedPlace.id === place.id
                  ? "#e0e0e0"
                  : "transparent",
            }}
          >
            {place.place_name} ({place.address_name})
          </SearchResult>
        ))}
      </SearchResultContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SearchModal;