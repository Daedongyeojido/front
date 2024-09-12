/* eslint-disable no-undef */
import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import { PageContainer, ContentContainer } from '../../components/Layout';
import AppBar from '../../components/AppBar';
import Button from '../../components/Button';
import Pointer from '../../Image/pointer.png'
import StartPoint from '../../Image/startpoint.png'
import EndPoint from '../../Image/endpoint.png'
import { routeRecommendation } from '../../apis/Recommendation'
import DeletedButton from '../../Image/DeleteButton.png'
import SaveRouteModal from '../../components/SaveRouteModal';

const RouteInfoContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const RouteInfoBox = styled.div`
  position: relative;
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 700;
`;

const RouteText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RouteLine = styled.span`
  display: flex;
  margin-bottom: 5px;
`;

const OverlayImage = styled.img`
  position: absolute;
  right: -30px;  
  top: 5%;
  transform: translateY(-50%);
  width: 70px;  // 이미지 크기 조절
  height: auto;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.mainColor};
  font-weight: bold;
  font-size: 17px;
`;
 
const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  margin-bottom: 20px;
`;

const WaypointList = styled.div`
  margin-top: 20px;
`;

const StopOverItem = styled.div`
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 10px;
  display: flex;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
`;

const Circle = styled.div`
    width: 8%;
    height: 23px;
    background-color: #575757;
    border-radius: 50%;
    color: white;
    font-size: 20px;
    margin: 3px 5px 0px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
`
const WaypointInfo = styled.div`
  width: 100%;
  flex-grow: 1; /* 텍스트가 남은 공간을 차지하도록 설정 */
  padding-left: 10px; /* Circle과 간격을 조금 더 줌 */
`;

const Icon = styled.img`
  margin: 25px 3px 0px 0px;
  width: 4%;
  height: 4%;
  cursor: pointer;
`;

function Map() {
  const location = useLocation();
  const { startPoint, endPoint } = location.state || {};
  const mapRef = useRef(null);
  const [startInfowindowOpen, setStartInfowindowOpen] = useState(false);
  const [endInfowindowOpen, setEndInfowindowOpen] = useState(false);
  const [routeData, setRouteData] = useState({places :[], map_pins: []});
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleGetRoute = async () => {
      try {
        if (startPoint && endPoint) {
          console.log(startPoint);
          console.log(endPoint);
          
          
          const data = await routeRecommendation(startPoint, endPoint, ['찻집']);

          // console.log('Received data:', data); // 응답 데이터 확인
  
          if (data.route && data.route.places.length > 0) {
            setRouteData(data.route); // routeData에 저장
          } else {
            console.warn('No route data available');
            setRouteData({ places: [], map_pins: [] }); // 빈 데이터로 설정
          }
        }
      } catch (error) {
        console.error("Error fetching route:", error.message);
      }
    };
    handleGetRoute();
  }, [startPoint, endPoint]);

  

  useEffect(() => {
    //지도 객체 선언하기 전에 디버깅을 해서 div 스타일이 잘 들어가 있는지 확인 
    const container = document.getElementById("map");
    // console.log("MapContainer styles before init:", window.getComputedStyle(container));
    
    if(container) {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=02925b5b6daafef564e5550b95696753&libraries=services&autoload=false`;
      script.async = true;
      
      script.onload = () => {
        console.log("카카오맵 스크립트 로드 완료");
        kakao.maps.load(() => {
          console.log("카카오맵 API 로드 완료"); // 디버그 메시지
        
          const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
          };
          const map = new kakao.maps.Map(container, options);
          mapRef.current = map;
        
          setTimeout(() => {
            map.relayout();  // 지도 레이아웃 재조정 -> 지도가 보이는 시점에 relayout()을 호출
          }, 500);
        
          if (startPoint && endPoint) {
            const bounds = new kakao.maps.LatLngBounds();
          
            const startMarkerImage = new kakao.maps.MarkerImage(
              StartPoint,
              new kakao.maps.Size(20, 20),
              {
                offset: new kakao.maps.Point(10, 10), // 이미지 중앙에 좌표를 일치시킴
                alt: "출발지: 보라색 마커"
              }
            );
          
            // 출발지 마커와 인포윈도우
            const startMarker = new kakao.maps.Marker({
              position: new kakao.maps.LatLng(startPoint.y, startPoint.x),
              image: startMarkerImage,
              map: map,
            });
            bounds.extend(new kakao.maps.LatLng(startPoint.y, startPoint.x));
          
            const startInfowindow = new kakao.maps.InfoWindow({
              content: `<div style="padding:5px;">출발지: ${startPoint.name}</div>`
            });
          
            const endMarkerImage = new kakao.maps.MarkerImage(
              EndPoint,
              new kakao.maps.Size(20, 20),
              {
                offset: new kakao.maps.Point(10, 10),
                alt: "도착지: 초록색 마커"
              }
            );
          
            // 도착지 마커와 인포윈도우
            const endMarker = new kakao.maps.Marker({
              position: new kakao.maps.LatLng(endPoint.y, endPoint.x),
              image: endMarkerImage,
              map: map,
            });
            bounds.extend(new kakao.maps.LatLng(endPoint.y, endPoint.x));
          
            const endInfowindow = new kakao.maps.InfoWindow({
              content: `<div style="padding:5px;">도착지: ${endPoint.name}</div>`
            });
          
          
            // 마커 클릭 이벤트, 다른 마커 클릭하면 인포윈도우 닫힘
            kakao.maps.event.addListener(startMarker, 'click', function () {
              if (startInfowindowOpen) {
                startInfowindow.close();
              } else {
                startInfowindow.open(map, startMarker);
              }
              setStartInfowindowOpen(!startInfowindowOpen);
              endInfowindow.close();
              setEndInfowindowOpen(false);
            });
          
            kakao.maps.event.addListener(endMarker, 'click', function () {
              if (endInfowindowOpen) {
                endInfowindow.close();
              } else {
                endInfowindow.open(map, endMarker);
              }
              setEndInfowindowOpen(!endInfowindowOpen);
              startInfowindow.close();
              setStartInfowindowOpen(false);
            });
            map.setBounds(bounds);
          }
        });
      };
    
      document.head.appendChild(script);
    
      return () => {
        document.head.removeChild(script);
      };
    }
  }, [startPoint, endPoint]);
  
  const handleRouteDelete = async (id) => {

      setRouteData(prevRouteData => {
        const map_pins = routeData.map_pins; //배열
        let newRoute = map_pins.filter(pin => pin.id !== id) 
        let newPlaces = routeData.places.filter((_, index)=> routeData.map_pins[index].id !== id);
  
        return {
          ...prevRouteData, 
          map_pins: map_pins,
          places: newPlaces,
        };
      })
    }

    const handleSaveRoute = () => { 
      setModalOpen(true)
    }

  return (
    <PageContainer>
      <AppBar title="추천 여정 확인하기" />
      <ContentContainer>
        <Text>추천 경로를 안내합니다</Text>
        <RouteInfoContainer>
          <RouteInfoBox>
            {startPoint && endPoint ? (
              <RouteText>
                <RouteLine>{startPoint.name}부터</RouteLine>
                <RouteLine>{endPoint.name}까지</RouteLine>
              </RouteText>
            ) : (
              '경로 정보가 없습니다.'
            )}
          </RouteInfoBox>
          <OverlayImage src={Pointer} alt="Overlay" />
        </RouteInfoContainer>

        <MapContainer id="map" />

        {/* 경유지 정보 화면에 표시 */}
        <WaypointList>
          {routeData?.places?.length > 0 ? (
            routeData.places.map((place, index) => (
              <>
              <StopOverItem key={place.place_name}>
                <Circle>{index + 1}</Circle>
                <WaypointInfo>
                  <div>경유지 {index +1} | {place.place_name}</div>
                  <div>주소  | {place.place_address}</div>
                  <div>설명  | {place.subCategory}</div>
                </WaypointInfo>
                <Icon src={DeletedButton} 
                  onClick={() => handleRouteDelete(routeData.map_pins[index].id)}/>
              </StopOverItem>
              </>
            ))
          ) : (
            <div>경유지 정보가 없습니다.</div>  // 데이터가 없을 경우 표시할 메시지
          )}                 
        </WaypointList>
        <Button
          backgroundColor={({ theme }) => theme.mainColor}
          onClick={handleSaveRoute}
        >
          경로 저장하기
        </Button>

        {/* <Button
          onClick={''}
        >
          다른 경로 추천받기
          
        </Button> */}
          {modalOpen && (
            <SaveRouteModal setModalOpen={setModalOpen} />
          )}
      </ContentContainer>
    </PageContainer>
  );
}

export default Map;