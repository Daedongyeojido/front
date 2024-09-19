import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import arrowImage from '../../../pages/Home/mypage/Arrow.png';
import heartImage from '../../../pages/Home/mypage/Heart.png';
import { fetchHashtagList } from '../../../apis/hashtag'; 
import { fetchCategoryList } from '../../../apis/category';

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
`;

const PathContainer = styled.div`
  width: 100%;
  background-color: #FFF;
  height: 100px;
  box-shadow: 0 0 3px rgba(10, 10, 10, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`
const PathsTagContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2px;
  margin-bottom: 10px;
  position: relative;
  z-index: 1;
`;

const PathsTagRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
`;

const TagsLarge = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 10px;
  margin-top: 10px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const PathsTag = styled.button`
  display: inline-block;
  padding: 10px 12px;
  border-radius: 20px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  white-space: nowrap;
  background-color: ${(props) => props.bgColor};
  cursor: pointer;
`;

const Route = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
`;

const RouteButton = styled.button`
  border-radius: 10px;
  text-align: center;
  position: relative;
  box-sizing: border-box;
  border: none;
  width: 100%;
  background-color: #FFF;
  height: 100px;
  box-shadow: 0 0 3px rgba(10, 10, 10, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SmallCircleButton = styled.button`
  width: 25px; 
  height: 25px;
  border-radius: 50%;
  background-color: #575757;
  border: none;
  position: absolute;
  top: 12px;
  left: 18px;
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
  top: 1%;
  z-index: 1;
  margin-left: 10px;
`;

const Via = styled.p`
  font-weight: bolder;
  position: absolute;
  left: 45px;
  top: 1%;
  z-index: 1;
  margin-left: 10px;
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

const ModalWhole = styled.div`
`;

const ModalContent = styled.div`  
`;

const ModalClose = styled.span`
`;


const PathPage = ({ onTagColorChange, onCloseModal }) => {
  const [clickedStars, setClickedStars] = useState([false, false, false]);
  const [hashtags, setHashtags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const hashtag = [
    { text: '#차분힐링', color: '#FDA043' }, 
    { text: '#초록초록', color: '#1DA514' },
    { text: '#피로회복', color: '#6A50D3' },
    { text: '#도파민디톡스', color: '#35A0FD' },
    { text: '#에너지넘치는', color: '#FF9FA5' }
  ];

  useEffect(() => {
    const loadHashtags = async () => {
      try {
        console.log('Loading hashtags...');
        const data = await fetchHashtagList();
        console.log('Hashtags:', data);
        setHashtags(data);
      } catch (error) {
        console.error('Error loading hashtags:', error);
        setError(error.message || 'Failed to fetch hashtags');
      }
    };

    const loadCategories = async () => {
      try {
        console.log('Loading categories...');
        const data = await fetchCategoryList();
        console.log('Categories:', data);
        setCategories(data);
      } catch (error) {
        console.error('Error loading categories:', error);
        setError(error.message || 'Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };

    loadHashtags();
    loadCategories();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleStarClick = (index) => {
    const newClickedStars = [...clickedStars];
    newClickedStars[index] = !newClickedStars[index];
    setClickedStars(newClickedStars);
  };

  const handleTagClick = (color) => {
    onTagColorChange(color); 
    onCloseModal();
  };

  const hashtagsRow1 = hashtag.slice(0, 3);
  const hashtagsRow2 = hashtag.slice(3);

  return (
    <>
        <PathsTagContainer>
          <PathsTagRow>
            {hashtagsRow1.map((tag, index) => (
              <PathsTag
                key={index}
                bgColor={tag.color}
                onClick={() => handleTagClick(tag.color)}
              >
                {tag.text}
              </PathsTag>
            ))}
          </PathsTagRow>
          <TagsLarge>
            {hashtagsRow2.map((tag, index) => (
              <PathsTag
                key={index}
                bgColor={tag.color}
                onClick={() => handleTagClick(tag.color)}
              >
                {tag.text}
              </PathsTag>
            ))}
          </TagsLarge>
        </PathsTagContainer>

        <Route>
        <PathContainer>
          <Start>
            <OnStart>출발지</OnStart>
            <Address>출발지 주소 / 설명 / 이름</Address>
            <SmallCircleButton>1</SmallCircleButton>
          </Start>
          </PathContainer>
          <ArrowIcon src={arrowImage} alt='arrow' />

          <PathContainer>
          <Start>
            <Via>경유지</Via>
            <Address>출발지 주소 / 설명 / 이름</Address>
            <Address>출발지 주소 / 설명 / 이름</Address>

            <SmallCircleButton>1</SmallCircleButton>
          </Start>
          </PathContainer>
          <ArrowIcon src={arrowImage} alt='arrow' />

          <ViaPoint>
            <Via>경유지 2</Via>
            <Address>경유지 주소 / 설명 / 이름</Address>
            <HeartIcon
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
            <HeartIcon
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
    </>
  );
};

export default PathPage;