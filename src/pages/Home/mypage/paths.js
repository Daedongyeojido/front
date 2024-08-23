import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { PageContainer, ContentContainer } from '../../../components/Layout';
import AppBar from '../../../components/AppBar';
import arrowImage from '../../../pages/Home/mypage/Arrow.png';
import heartImage from '../../../pages/Home/mypage/Heart.png';

// Keyframes for bounce animation
const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

// Styled components
const PathsTagContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 10px 10px 10px;
  margin-top: -30px; /* Adjust this value to move the container up */
  background-color: #f4f4f4;
  position: relative;
  z-index: 1;
`;

const PathsTagRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 32px;
  width: 100%;
`;

const TagsLarge = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 20px;
  margin-top: 10px;
  width: 100%;
`;

const PathsTag = styled.button`
  display: inline-block;
  padding: 7px 10px;
  border-radius: 12px;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  border: none;
  white-space: nowrap;
  background-color: ${(props) => props.bgColor};
`;

const Route = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
`;

const RouteButton = styled.button`
  background-color: #FFFAF3;
  border: 2px solid #ddd;
  border-radius: 20px;
  padding: 5px;
  margin: 10px 0;
  width: 80%;
  height: 70px;
  text-align: center;
  position: relative;
  box-sizing: border-box;
  cursor: pointer;
`;

const SmallCircleButton = styled.button`
  width: 25px; 
  height: 25px;
  border-radius: 50%;
  background-color: #575757;
  border: none;
  position: absolute;
  top: 5px; /* Adjust as needed */
  left: 15px; /* Adjust as needed */
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
`;

const Start = styled(RouteButton)``;
const ViaPoint = styled(RouteButton)``;
const Destination = styled(RouteButton)``;

const OnStart = styled.p`
  font-weight: bolder;
  position: absolute;
  left: 45px;
  top: -8%;
  z-index: 1;
`;

const Via = styled.p`
  font-weight: bolder;
  position: absolute;
  left: 45px;
  top: -8%;
  z-index: 1;
`;

const OffStart = styled.p`
  font-weight: bolder;
  position: absolute;
  left: 45px;
  top: -8%;
  z-index: 1;
`;

const Address = styled.p`
  font-size: 15px;
  position: absolute;
  left: 55px;
  top: 30%;
  z-index: 1;
`;

const ArrowIcon = styled.img`
  width: 40px;
  height: 40px;
  margin-left: 1em;
  vertical-align: middle;
`;

const StarIcon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  right: -30px;
  top: 50%;
  transform: translateY(-50%);
  transition: filter 0.3s, transform 0.3s;
  animation: ${bounce} 1s infinite;
  
  &.clicked {
    filter: brightness(0) saturate(100%) invert(74%) sepia(20%) saturate(550%) hue-rotate(56deg) brightness(98%) contrast(89%);
    transform: translateY(-7px);
    animation: none; /* Stop animation when clicked */
  }
`;

const ModalWhole = styled.div`
`;

const ModalContent = styled.div`  
`;

const ModalClose = styled.span`
`;

const PathPage = () => {
  const [clickedStars, setClickedStars] = useState([false, false, false]);
  const [showModal, setShowModal] = useState(false);

  const handleStarClick = (index) => {
    const newClickedStars = [...clickedStars];
    newClickedStars[index] = !newClickedStars[index];
    setClickedStars(newClickedStars);
  };

  const tags = [
    { text: '#차분힐링', color: '#59AF7E' },
    { text: '#초록초록', color: '#59AF7E' },
    { text: '#피로회복', color: '#7079BC' },
    { text: '#도파민디톡스', color: '#F9B8BC' },
    { text: '#에너지넘치는', color: '#F9B8BC' }
  ];

  const tagsRow1 = tags.slice(0, 3);
  const tagsRow2 = tags.slice(3);

  return (
    <PageContainer>
      <AppBar title='내 경로 모아보기' />
      <ContentContainer>
        <PathsTagContainer>
          <PathsTagRow>
            {tagsRow1.map((tag, index) => (
              <PathsTag key={index} bgColor={tag.color}>
                {tag.text}
              </PathsTag>
            ))}
          </PathsTagRow>
          <TagsLarge>
            {tagsRow2.map((tag, index) => (
              <PathsTag key={index} bgColor={tag.color}>
                {tag.text}
              </PathsTag>
            ))}
          </TagsLarge>
        </PathsTagContainer>

        <Route>
          <Start>
            <OnStart>출발지</OnStart>
            <Address>출발지 주소 / 설명 / 이름</Address>
            <SmallCircleButton>1</SmallCircleButton>
          </Start>
          <ArrowIcon src={arrowImage} alt='arrow' />

          <ViaPoint>
            <Via>경유지 1</Via>
            <Address>경유지 주소 / 설명 / 이름</Address>
            <StarIcon
              src={heartImage}
              alt='Star'
              className={clickedStars[0] ? 'clicked' : ''}
              onClick={() => handleStarClick(0)}
            />
            <SmallCircleButton>2</SmallCircleButton>
          </ViaPoint>

          <ArrowIcon src={arrowImage} alt='arrow' />

          <ViaPoint>
            <Via>경유지 2</Via>
            <Address>경유지 주소 / 설명 / 이름</Address>
            <StarIcon
              src={heartImage}
              alt='Star'
              className={clickedStars[1] ? 'clicked' : ''}
              onClick={() => handleStarClick(1)}
            />
            <SmallCircleButton>3</SmallCircleButton>
          </ViaPoint>

          <ArrowIcon src={arrowImage} alt='arrow' />

          <ViaPoint>
            <Via>경유지 3</Via>
            <Address>경유지 주소 / 설명 / 이름</Address>
            <StarIcon
              src={heartImage}
              alt='Star'
              className={clickedStars[2] ? 'clicked' : ''}
              onClick={() => handleStarClick(2)}
            />
            <SmallCircleButton>4</SmallCircleButton>
          </ViaPoint>

          <ArrowIcon src={arrowImage} alt='arrow' />

          <Destination>
            <OffStart>도착지</OffStart>
            <Address>도착지 주소 / 설명 / 이름</Address>
            <SmallCircleButton>5</SmallCircleButton>
          </Destination>
        </Route>

        {showModal && (
          <ModalWhole>
            <ModalContent>
              <ModalClose onClick={() => setShowModal(false)}>×</ModalClose>
              <p>모달 내용</p>
            </ModalContent>
          </ModalWhole>
        )}
      </ContentContainer>
    </PageContainer>
  );
};

export default PathPage;