import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import { PageContainer, ContentContainer } from '../../components/Layout';
import AppBar from '../../components/AppBar';
import Button from '../../components/Button';

const RouteInfoBox = styled.div`
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 700;
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
        <RouteInfoBox>
          {startPoint && endPoint ? 
            `${startPoint.name}부터 ${endPoint.name}까지` : 
            '경로 정보가 없습니다.'
          }
        </RouteInfoBox>
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