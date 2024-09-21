import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { showDetailRoute } from '../../../apis/showDetailRoute';
import arrowImage from '../../../pages/Home/mypage/Arrow.png';
import heartImage from '../../../pages/Home/mypage/Heart.png';
import {PageContainer } from '../../../components/Layout';
import {clickLike } from '../../../apis/clickLike'
import { cancelLike } from '../../../apis/cancelLike';

const ModalWhole = styled.div`
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
  padding: 20px;
  width: 70%;
  height: 90%;
  max-width: 400px;
  max-height: 600px;
  display: flex;
  flex-direction: column;
  background-color: #E9F0D8;
  z-index: 1001;
  border-radius: 10px;
  overflow-y: auto; 
  &::-webkit-scrollbar {
    display: none; 
  }
`;

const ModalCloseButton = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 100%;
  font-size: 24px;
  cursor: pointer;
  z-index: 2011;
  margin-bottom: 7px;
`;

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
`;

const StopOverContainer = styled.div`
  width: 100%;  
`
const PathContainer = styled.div`
  width: 90%;
  background-color: #FFF;
  height: 110px;
  box-shadow: 0 0 3px rgba(10, 10, 10, 0.1);
  display: flex;
  justify-content: center;
  border-radius: 10px;
  margin-bottom: 10px;
  margin-top: 5px;
  padding-top: 3px;
`
const SmallCircleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px; 
  height: 25px;
  border-radius: 50%;
  background-color: #B9D673;
  color: white;
  font-weight: bold;
  font-size: 14px;
  margin-top: 15px;
  margin-left: 8px;
  border: none;
`;

const OnStart = styled.p`
  width: 100%;
  font-weight: bold;
  font-size: 14px;
`;

const Address = styled.div`
  font-size: 14px;
  z-index: 1;
  margin-bottom: 5px;
`;

const ArrowIcon = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-left: 140px;
`;

const HeartIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-top: 55px;
  margin-left: 10px;
  cursor: pointer;
  transform: translateY(-50%);
  transition: filter 0.3s, transform 0.3s;
  animation: ${bounce} 1s infinite;
  
  &.clicked {
    filter: brightness(0) saturate(100%) invert(74%) sepia(20%) saturate(550%) hue-rotate(56deg) brightness(98%) contrast(89%);
    transform: translateY(-7px);
    animation: none;
  }
`;

const WaypointInfo = styled.div`
  width: 100%;
  flex-grow: 1; /* 텍스트가 남은 공간을 차지하도록 설정 */
  padding-left: 10px; /* Circle과 간격을 조금 더 줌 */
`;

const Warning = styled.div`
  align-content: center;
  width: 100%;
  height: 90px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  margin-bottom: 20px;
  text-align: center;
`

const Modal = ({ isOpen, onClose, children, routeId }) => {
  const [clickedHearts, setClickedHearts] = useState([false, false, false]);
  const [hashtags, setHashtags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [detailRoute, setDetailRoute] = useState([]);

  const hashtag = [
    { text: '#차분힐링', color: '#FDA043' },
    { text: '#초록초록', color: '#1DA514' },
    { text: '#피로회복', color: '#6A50D3' },
    { text: '#도파민디톡스', color: '#35A0FD' },
    { text: '#에너지넘치는', color: '#FF9FA5' }
  ];

  useEffect(() => {
    const handleShowRoute = async () => {
      try {
        const data = await showDetailRoute(routeId);

        if (data && data.route_id > 0) {
          setDetailRoute(data)
          // console.log(detailRoute);
        } else {
          console.warn('No route data available');
        }

      } catch (error) {
        console.error("Error fetching route:", error.message);
      }
    };
    handleShowRoute();
  }, []);

  const handleHeartClick = async (index, route_id, place_id) => {
    
    const newClickedHeart = [...clickedHearts];
    newClickedHeart[index] = !newClickedHeart[index];

    if(clickedHearts.includes(place_id)) {
      try {
        const data = await cancelLike(route_id, place_id);
        console.log('하트 취소 성공 : ' ,data);

        setClickedHearts(prevClickedHearts => prevClickedHearts.filter(id => id !== place_id)
      );
        
      } catch (error) {
        console.error('하트 취소 실패 :' , error)
      }
    } else {
      try {
        const data = await clickLike(route_id,place_id );
        console.log('하트 누르기 성공 : ', data);
        
        setClickedHearts(prevClickedHearts => [...prevClickedHearts, place_id]);

      } catch(error){
        console.error('하트 클릭 실패 : ' , error);
      }
    }
  };


  if (!isOpen) return null;

  return (
    <ModalWhole onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalCloseButton onClick={onClose}>&times;</ModalCloseButton>
        {children}
        <PageContainer>

          <PathContainer key={detailRoute.route_id}>
            <WaypointInfo>
              <OnStart>출발지 | {detailRoute.startpoint_name}</OnStart>
              <Address>주소 | {detailRoute.startpoint_address}</Address>
              <Address>카테고리 | {detailRoute.startpoint_address}</Address>
            </WaypointInfo>
          </PathContainer>

          {detailRoute.places && detailRoute.places.length > 0 ? (
            detailRoute.places.map((stopOver, index) => {              
              return (
                <StopOverContainer>
                  <ArrowIcon src={arrowImage} alt='arrow' />
                  <div style={{display: 'flex', flexDirection: 'row' }}>
                    <PathContainer>
                      <SmallCircleButton>{index + 1}</SmallCircleButton>
                      <WaypointInfo>
                        <OnStart>경유지 {index + 1} | {stopOver.place_name}</OnStart>
                        <Address>주소  | {stopOver.place_address}</Address>
                        <Address> 카테고리 | {stopOver.subCategory}</Address>
                      </WaypointInfo>
                    </PathContainer>
                    <HeartIcon
                      src={heartImage}
                      alt='Star'
                      className={clickedHearts.includes(stopOver.place_id) ? 'clicked' : ''}
                      onClick={() => handleHeartClick(index, detailRoute.route_id, stopOver.place_id )}
                    />
                    
                  </div>
                </StopOverContainer>
              )
            })
          ) : (
            <Warning>세부 경로 정보가 없습니다.</Warning>
          )}

          <ArrowIcon src={arrowImage} alt='arrow' />
          <PathContainer>
            <WaypointInfo>
              <OnStart>도착지 | {detailRoute.endpoint_name}</OnStart>
              <Address>주소 | {detailRoute.endpoint_address}</Address>
              <Address>카테고리 | {detailRoute.endpoint_address}</Address>
            </WaypointInfo>
          </PathContainer>
          
        </PageContainer>
      </ModalContent>
    </ModalWhole>
  );
};

export default Modal;