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
  color: ${({theme})=>theme.mainColor};
  font-weight: bold;
  font-size: 17px;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  margin-bottom: 20px;
`;

const handleSaveRoute = () =>{

}

function Map() {
  const location = useLocation();
  const { startPoint, endPoint } = location.state || {};
  const mapRef = useRef(null);
  const [startInfowindowOpen, setStartInfowindowOpen] = useState(false);
  const [endInfowindowOpen, setEndInfowindowOpen] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=02925b5b6daafef564e5550b95696753&libraries=services&autoload=false`;
    script.async = true;

    script.onload = () => {
      kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
        const map = new kakao.maps.Map(container, options);
        mapRef.current = map;

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
          kakao.maps.event.addListener(startMarker, 'click', function() {
            if (startInfowindowOpen) {
              startInfowindow.close();
            } else {
              startInfowindow.open(map, startMarker);
            }
            setStartInfowindowOpen(!startInfowindowOpen);
            endInfowindow.close();
            setEndInfowindowOpen(false);
          });

          kakao.maps.event.addListener(endMarker, 'click', function() {
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
  }, [startPoint, endPoint]);

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

        <Button
            backgroundColor={({theme}) => theme.mainColor}
            onClick={handleSaveRoute}
        >
            경로 저장하기
        </Button>

        <Button
            onClick={handleSaveRoute}
        >
            다른 경로 추천받기
        </Button>

      </ContentContainer>
    </PageContainer>
  );
}

export default Map;