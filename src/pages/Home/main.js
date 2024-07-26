/* eslint-disable no-undef */
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import FootPrint from "../../Image/FootPrint.png";
import Button from "../../components/Button";
import { FaQuestionCircle } from "react-icons/fa"; // 튜토리얼 아이콘
import { FaUser } from "react-icons/fa"; // 마이페이지 아이콘
import { useNavigate } from "react-router-dom";
import { PageContainer, ContentContainer } from "../../components/Layout";

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
top: 36%;
left: 54%;
width: 169px;
`;

const TopContainer = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
margin-bottom: 10px;
`;

const LogoText = styled.div`
font-size: 45px;
font-weight: bold;
margin-right: 20px;
`;

const LocationContainer = styled.div`
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
`;

const ModalContent = styled.div`
background-color: white;
padding: 20px;
border-radius: 10px;
width: 90%;
max-width: 400px;
height: 80%;
max-height: 600px;
display: flex;
flex-direction: column;
z-index: 1001;
`;

const MapContainer = styled.div`
width: 100%;
height: 200px;
margin-bottom: 10px;
flex-shrink: 0;
`;

const InputBox = styled.input`
width: ${(props) => (props.isModal ? "100%" : "85%")};
height: 50px;
font-size: 15px;
flex-shrink: 0;
justify-content: center;
align-items: center;
background-color: #eeeeee;
border-radius: 10px;
box-shadow: ${(props) =>
    props.isModal ? "none" : "0px 5px 5px rgba(0, 0, 0, 0.25)"};
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
justify-content: ${(props) =>
    props.isSearched ? "space-between" : "center"};
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

const IconContainer = styled.div`
display: flex;
gap: 15px;
`;

const IconWrapper = styled.div`
cursor: pointer;
font-size: 24px; // 아이콘 크기 조절
color: #333; // 아이콘 색상
&:hover {
    color: #789ddd; // 호버 시 색상 변경
}
`;

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
        <FootPrintImg src={FootPrint} alt="Footprint" />

        <TopContainer>
        <LogoText>그린루트</LogoText>
        <IconContainer>
            <IconWrapper>
            <FaQuestionCircle
                title="튜토리얼"
                onClick={() => navigate("/tutorial")}
            />
            </IconWrapper>
            <IconWrapper>
            <FaUser title="마이페이지" onClick={() => navigate("/mypage")} />
            </IconWrapper>
        </IconContainer>
        </TopContainer>
        <LocationContainer>
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
            backgroundColor="#789DDD"
            onClick={handleGo}
        >
            GO
        </Button>
        </LocationContainer>
    </ContentContainer>
    {showModal && (
        <Modal>
        <ModalContent>
            <MapContainer id="map" />
            <InputBox
            placeholder="장소를 검색하세요"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            isModal={true}
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
        </Modal>
    )}
    </PageContainer>
);
}

export default Home;
