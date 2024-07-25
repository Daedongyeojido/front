/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import Cloud from "../../../Image/Cloud.png";
import styled from "styled-components";
import FootPrint from "../../../Image/FootPrint.png";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";

const PageContainer = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;
const CloudImg = styled.img`
  width: 100%;
  height: 131px;
`;

const FootPrintImg = styled.img`
  position: absolute;
  z-index: 1;
  top: 36%;
  left: 65.5%;
  width: 169px;
`;

const ContentContainer = styled.div`
  padding: 0px 50px;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 150px;
`;

const LogoText = styled.div`
  font-size: 45px;
  font-weight: bold;
  margin-right: 20px;
`;
// const Button = styled.div`
//     width: 70px;
//     height: 40px;
//     font-size: 13px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     background-color: #EEEEEE;
//     border-radius: 10px;
//     box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
// `
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
const InputBox = styled.input`
  width: 80%;
  height: 40px;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eeeeee;
  border-radius: 10px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
  border: none;
  padding: 0 10px;
  margin: 10px 0;
  outline: none;
  &::placeholder {
    color: #888;
  }
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
  z-index: 1000; // 높은 z-index 값을 추가
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-height: 80%;
  overflow-y: auto;
  z-index: 1001; // Modal보다 더 높은 z-index 값을 추가
`;

const SearchResult = styled.div`
  cursor: pointer;
  padding: 10px;
  &:hover {
    background-color: #f0f0f0;
  }
`;

function Recommend() {
  const [startPoint, setStartPoint] = useState({ name: "", x: 0, y: 0 });
  const [endPoint, setEndPoint] = useState({ name: "", x: 0, y: 0 });
  const [kakaoLoaded, setKakaoLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isStartSearch, setIsStartSearch] = useState(true);
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

  const handleSearch = () => {
    if (!kakaoLoaded) return;

    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(searchKeyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setSearchResults(data);
      }
    });
  };

  const handlePlaceSelect = (place) => {
    if (isStartSearch) {
      setStartPoint({ name: place.place_name, x: place.x, y: place.y });
    } else {
      setEndPoint({ name: place.place_name, x: place.x, y: place.y });
    }
    setShowModal(false);
  };

  const handleInputClick = (isStart) => {
    setIsStartSearch(isStart);
    setShowModal(true);
    setSearchResults([]);
    setSearchKeyword("");
  };

  const handleGo = () => {
    navigate("/map", { state: { startPoint, endPoint } });
  };

  return (
    <PageContainer>
      <CloudImg src={Cloud} alt="Cloud" />
      <FootPrintImg src={FootPrint} alt="Footprint" />
      <ContentContainer>
        <TopContainer>
          <LogoText>그린루트</LogoText>
          <ButtonContainer>
            <Button
              color="black"
              fontSize="13px"
              width="85%"
              height="42px"
              backgroundColor="#EEEEEE"
              borderRadius="10px"
              customStyle="box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25); margin-right: 10px;"
            >
              튜토리얼
            </Button>
            <Button
              color="black"
              fontSize="12px"
              height="42px"
              backgroundColor="#EEEEEE"
              borderRadius="10px"
              customStyle="box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);"
            >
              마이페이지
            </Button>
          </ButtonContainer>
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
            borderRadius="30px"
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
            <InputBox
              placeholder="장소를 검색하세요"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <Button onClick={handleSearch}>검색</Button>
            {searchResults.map((place) => (
              <SearchResult
                key={place.id}
                onClick={() => handlePlaceSelect(place)}
              >
                {place.place_name} ({place.address_name})
              </SearchResult>
            ))}
          </ModalContent>
        </Modal>
      )}
    </PageContainer>
  );
}

export default Recommend;
