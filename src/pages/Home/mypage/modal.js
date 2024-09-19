import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import {showDetailRoute} from '../../../apis/showDetailRoute';
import arrowImage from '../../../pages/Home/mypage/Arrow.png';
import heartImage from '../../../pages/Home/mypage/Heart.png';
import { ContentContainer, PageContainer } from '../../../components/Layout';

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
  border: 1px solid #000 ;
  padding: 20px;
  border-radius: 10px;
  width: 70%;
  height: 90%;
  max-width: 400px;
  max-height: 600px;
  display: flex;
  flex-direction: column;
  background-color: #E9F0D8;
  z-index: 1001;
  border-radius: 10px;
  scroll-behavior: auto;
  cursor: default;
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

const PathContainer = styled.div`
  width: 90%;
  background-color: #FFF;
  height: 100px;
  box-shadow: 0 0 3px rgba(10, 10, 10, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin-bottom: 60px;
`
const SmallCircleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px; 
  height: 25px;
  border-radius: 50%;
  background-color: #575757;
  border: 2px solid red;
  color: white;
  font-weight: bold;
  font-size: 14px;
`;

const OnStart = styled.p`
  width: 100%;
  font-weight: bold;
  margin-left: 10px;
  border: 1px solid #000;
  font-size: 14px;
`;

const OffStart = styled.p`
  font-weight: bolder;
  position: absolute;
  left: 45px;
  top: 1%;
  z-index: 1;
  margin-left: 10px;
`;

const Address = styled.p`
  font-size: 15px;
  left: 55px;
  top: 30%;
  z-index: 1;
  border: 1px solid #000;
`;

const ArrowIcon = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-left: 1em;
  margin-top: 10rem;
`;

const HeartIcon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  right: -38px;
  top: 50%;
  transform: translateY(-50%);
  transition: filter 0.3s, transform 0.3s;
  animation: ${bounce} 1s infinite;
  
  &.clicked {
    filter: brightness(0) saturate(100%) invert(74%) sepia(20%) saturate(550%) hue-rotate(56deg) brightness(98%) contrast(89%);
    transform: translateY(-7px);
    animation: none;
  }
`;

const Via = styled.p`
  font-weight: bolder;
  position: absolute;
  left: 45px;
  top: 1%;
  z-index: 1;
  margin-left: 10px;
`;

const Modal = ({ isOpen, onClose, children, routeId }) => {
  const [clickedStars, setClickedStars] = useState([false, false, false]);
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

          if (data && data.route_id > 0 ) {
            setDetailRoute(data)
            console.log(detailRoute.placesx);

          } else {
            console.warn('No route data available');
          }
        
      } catch (error) {
        console.error("Error fetching route:", error.message);
      }
    };
    handleShowRoute();
  }, []);

  const handleStarClick = (index) => {
    const newClickedStars = [...clickedStars];
    newClickedStars[index] = !newClickedStars[index];
    setClickedStars(newClickedStars);
  };


  if (!isOpen) return null;

  return (
    <ModalWhole onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalCloseButton onClick={onClose}>&times;</ModalCloseButton>
        {children}
          <PageContainer>
                  <PathContainer>
                      <SmallCircleButton>1</SmallCircleButton>
                      <OnStart>출발지 : {detailRoute.startpoint_name}</OnStart>
                      <Address>주소 | {detailRoute.startpoint_address}</Address>
                      <Address>주소 | {detailRoute.startpoint_address}</Address>
                      <HeartIcon
                        src={heartImage}
                        alt='Star'
                        className={clickedStars[1] ? 'clicked' : ''}
                        onClick={() => handleStarClick(1)}
                      />
                      <ArrowIcon src={arrowImage} alt='arrow' />
                  </PathContainer>

                    {detailRoute.places && detailRoute.places.length > 0  ? (
                        detailRoute.places.map((stopOver, index) =>{
                          return(
                            <PathContainer>
                              <div>경유지 {index+2} : {stopOver.place_name}</div>
                                <div>주소 | {stopOver.place_address}</div>
                                <HeartIcon
                                  src={heartImage}
                                  alt='Star'
                                  className={clickedStars[1] ? 'clicked' : ''}
                                  onClick={() => handleStarClick(1)}
                                />
                                <SmallCircleButton>3</SmallCircleButton>
                                <ArrowIcon src={arrowImage} alt='arrow' />
                                </PathContainer>
                          )
                        }
                      )
                    ) : (
                      <div>'세부 경로 정보가 없습니다. '</div>
                    ) 
                    }

              
          </PageContainer>
      </ModalContent>
    </ModalWhole>
  );
};

export default Modal;