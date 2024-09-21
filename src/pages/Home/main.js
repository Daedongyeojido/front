/* eslint-disable no-undef */
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Hand from '../../Image/Hand.png';
import { useNavigate } from "react-router-dom";
import { PageContainer, ContentContainer } from "../../components/Layout";
import TopContainer from "../../components/TopContainer";
import LocationInputs from "../../components/LocationInputs";
import SearchModal from "../../components/SearchModal";
import Rank from '../../components/Rank';
import FilterModal from "../../components/FilterModal";

// import axios from 'axios';

const Header = styled.div`
  width: 100%;
  height: 200px;
  background-image: url("/Images/cloud.png");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

const FootPrintImg = styled.div`
  width: 100%;
  height: 300px;
  background-image: url("/Images/FootPrint.png");
  background-size: contain;
  background-position-x: right;
  background-repeat: no-repeat;
  position: absolute;
  top: 350px;
  z-index: 0;
`;

const HandImg = styled.img`
    width: 34px;
    height: 34px;
    margin-left: 10px;
`
const RankContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`
function Home() {
  const [startPoint, setStartPoint] = useState({ name: "", x: 0, y: 0 });
  const [endPoint, setEndPoint] = useState({ name: "", x: 0, y: 0 });
  const [kakaoLoaded, setKakaoLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isStartSearch, setIsStartSearch] = useState(true);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isSearched, setIsSearched] = useState(false);
  const [avoidCategories, setAvoidCategories] = useState({}); 
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=02925b5b6daafef564e5550b95696753&libraries=services&autoload=false`;
    script.async = true;

    script.onload = () => {
      kakao.maps.load(() => {
        setKakaoLoaded(true);
      });
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initializeMap = () => {
    if (!kakaoLoaded) return;

    const container = document.getElementById("map");
    
    const options = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567),
      level: 3,
    };
    mapRef.current = new kakao.maps.Map(container, options);
    
  };
  const handleSearch = () => {
    if (!kakaoLoaded) return;

    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(searchKeyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setSearchResults(data);
        setIsSearched(true);

        const firstResult = data[0];
        const moveLatLng = new kakao.maps.LatLng(firstResult.y, firstResult.x);
        mapRef.current.setCenter(moveLatLng);

        if (markerRef.current) {
          markerRef.current.setMap(null);
        }
        markerRef.current = new kakao.maps.Marker({
          position: moveLatLng,
          map: mapRef.current,
        });
      }
    });
  };

  const handlePlaceSelect = (place) => {
    setSelectedPlace(place);
    // console.log('place', place);
    
    const moveLatLng = new kakao.maps.LatLng(place.y, place.x);
    mapRef.current.setCenter(moveLatLng);

    if (markerRef.current) {
      markerRef.current.setMap(null);
    }
    markerRef.current = new kakao.maps.Marker({
      position: moveLatLng,
      map: mapRef.current,
    });
  };

  const handleConfirmSelection = () => {
    if (selectedPlace) {
      // console.log('selectedPalce',selectedPlace);
      
      if (isStartSearch) {
        setStartPoint({
          name: selectedPlace.place_name,
          x: selectedPlace.x, 
          y: selectedPlace.y,  
          address: selectedPlace.address_name
        });
      } else {
        setEndPoint({
          name: selectedPlace.place_name,
          x: selectedPlace.x,
          y: selectedPlace.y,
          address: selectedPlace.address_name 
        });
      }
      setShowModal(false);
      setIsSearched(false);
      setSelectedPlace(null);
    }
    
  };

  const handleInputClick = (isStart) => {
    setIsStartSearch(isStart);
    setShowModal(true);
    setSearchResults([]);
    setSearchKeyword("");
    setIsSearched(false);
    setSelectedPlace(null);
    setTimeout(initializeMap, 0);
  };

  const handleGo = () => {
    if (startPoint.name && endPoint.name) {
      navigate('/map', { 
        state: { 
          startPoint,
          endPoint
        } 
      });
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };


  return (
    <PageContainer>
      <Header />
      <FootPrintImg />
      <ContentContainer>
        <TopContainer />
        <LocationInputs
          startPoint={startPoint}
          endPoint={endPoint}
          avoidPlaces={avoidCategories}
          handleInputClick={handleInputClick}
          handleGo={handleGo}
          handleFilterModal={handleFilterModal}
        />

        <RankContainer>
            <h2>추천 장소 만족도 순위</h2>
            <HandImg src={Hand}></HandImg>
        </RankContainer>
        <Rank /> 
      </ContentContainer>
      {showModal && (
        <SearchModal
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          handleSearch={handleSearch}
          isSearched={isSearched}
          handleConfirmSelection={handleConfirmSelection}
          selectedPlace={selectedPlace}
          searchResults={searchResults}
          handlePlaceSelect={handlePlaceSelect}
          onClose={handleModalClose}
        />
      )}
      {showFilterModal&& (
        <FilterModal 
        avoidCategories={avoidCategories} 
        setAvoidCategories={setAvoidCategories} 
        onClose={() => {
          setShowFilterModal(false);
        }}
        />)}
    </PageContainer>
  );
}

export default Home;
