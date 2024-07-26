/* eslint-disable no-undef */
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import FootPrint from "../../Image/FootPrint.png";
import Hand from '../../Image/Hand.png';
import { useNavigate } from "react-router-dom";
import { PageContainer, ContentContainer } from "../../components/Layout";
import TopContainer from "../../components/TopContainer";
import LocationInputs from "../../components/LocationInputs";
import SearchModal from "../../components/SearchModal";
import Rank from '../../components/Rank';

const Header = styled.div`
  width: 100%;
  height: 200px;
  background-image: url("/Images/cloud.png");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

const FootPrintImg = styled.img`
  position: absolute;
  z-index: 1;
  top: 300px; /* 브라우저 크기에 관계없이 고정된 위치 */
  left: 49%; /* 부모 요소의 중앙으로 정렬 */
  transform: translateX(50%); /* 이미지의 중앙으로 이동 */
  width: 169px;
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
  const [searchResults, setSearchResults] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isStartSearch, setIsStartSearch] = useState(true);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isSearched, setIsSearched] = useState(false);
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
      if (isStartSearch) {
        setStartPoint({
          name: selectedPlace.place_name,
          x: selectedPlace.x,
          y: selectedPlace.y,
        });
      } else {
        setEndPoint({
          name: selectedPlace.place_name,
          x: selectedPlace.x,
          y: selectedPlace.y,
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
    navigate("/map", { state: { startPoint, endPoint } });
  };

  return (
    <PageContainer>
      <Header />
      <ContentContainer>
        <FootPrintImg src={FootPrint}/>
        <TopContainer />
        <LocationInputs
          startPoint={startPoint}
          endPoint={endPoint}
          handleInputClick={handleInputClick}
          handleGo={handleGo}
        />
        <RankContainer>
            <h2>추천 장소 만족도 순위</h2>
            <HandImg src={Hand}></HandImg>
        </RankContainer>
        <Rank></Rank>
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
        />
      )}
    </PageContainer>
  );
}

export default Home;
