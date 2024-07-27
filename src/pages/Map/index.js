import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import { PageContainer, ContentContainer } from '../../components/Layout';
import AppBar from '../../components/AppBar';
import Button from '../../components/Button';
import Pointer from '../../Image/pointer.png'

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

const handleSaveRoute = () =>{

}

function Map() {
  const location = useLocation();
  const { startPoint, endPoint } = location.state || {};

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
{/* 여기 서버에서 준값으로 지도 넣기
민수 컴포넌트 재사용 */}
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