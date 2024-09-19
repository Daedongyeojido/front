import React, { useState,useEffect} from 'react';
import styled from 'styled-components';
import { PageContainer, ContentContainer } from '../../../components/Layout';
import AppBar from '../../../components/AppBar';
import { showMyRoute } from '../../../apis/showMyRoute';
import Modal from './modal';


const HashtagContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 20px 0 5px;
  margin-top: 10px;
`;

const TagsContainer =styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
`

const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    height: 100%;
    align-items: center;
`;

const Hashtags = styled.div`
  width: 25%;
  height: 39px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 17.5px;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
`;

const DateLabel = styled.div`
  position: absolute;
  top: 15px;
  left: 20%;
  transform: translateX(-50%);
  font-size: 18px;
  font-weight: bolder;
  color: #555;
`;

const MypathContainer = styled.div`
  align-content: center;
  width: 100%;
  height: 90px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  margin-bottom: 20px;
`;

const Depart = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-left: 30px;
  margin-bottom: 7px;
  color: #555;
`;

const Arrival = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-left: 30px;
  color: #555;
`;

const Dot = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  cursor: pointer;
`;

function MyPathPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [dotColors, setDotColors] = useState([]);
  const [routes, setRoutes] = useState([]); // API에서 가져온 경로 데이터를 저장할 state
  const [routeId, setRouteId] = useState(null)

  useEffect(() => {
    const handleShowRoute = async () => {
      try {
          const data = await showMyRoute();

          if (data && data.length > 0 ){
            setRoutes(data);            
          }
      } catch (error) {
        console.error("내 경로 정보 연동안되서 화면에 표시못함", error.message);
      }
    };
    handleShowRoute();
  }, []);


  const tags = [
    { text: '#차분힐링', color: '#FDA043' },
    { text: '#초록초록', color: '#1DA514' },
    { text: '#피로회복', color: '#6A50D3' },
    { text: '#도파민디톡스', color: '#35A0FD' },
    { text: '#에너지넘치는', color: '#FF9FA5' }
  ];

  
  const handleTagClick = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag.text) ? prevTags.filter((t) => t !== tag.text) : [...prevTags, tag.text]
    );

    setDotColors((prevColors) => {
      const newColors = new Set(prevColors);
      newColors.add(tag.color);
      if (newColors.size > 5) {
        const colorsArray = Array.from(newColors);
        newColors.delete(colorsArray[0]);
      }
      return Array.from(newColors);
    });
    

    setIsModalOpen(false); // Close the modal
  };

  const handleDotClick = (event, color) => {
    event.stopPropagation(); // Prevents the event from bubbling up to the container
    setDotColors((prevColors) => prevColors.filter((c) => c !== color));
  };

  // 경로 클릭 시 세부 정보 불러오기
      const handleRouteClick = (routeId) => {
        setRouteId(routeId)
        setIsModalOpen(true)
      };

  return (
    <PageContainer>
      <AppBar title="나의 경로 " />
      <ContentContainer>
      <HashtagContainer>
        <TagsContainer>
          <RowContainer>
          {tags.slice(0, 3).map((tag, index) => (
            <Hashtags
              key={index}
              className={selectedTags.includes(tag.text) ? 'selected' : ''}
              style={{ backgroundColor: tag.color }}
            >
              {tag.text}
            </Hashtags>
          ))}
          </RowContainer>
        <RowContainer>
          {tags.slice(3).map((tag, index) => (
            <Hashtags
              key={index}
              className={selectedTags.includes(tag.text) ? 'selected' : ''}
              style={{ backgroundColor: tag.color , width:'30%'}}
            >
              {tag.text}
            </Hashtags>
          ))}
        </RowContainer>
        </TagsContainer>

      </HashtagContainer>
         {/* 불러온 경로들을 화면에 표시 */}
         { routes?.length > 0 ? ( 
            routes
            .filter((_, index) => index % 2 === 0 )
            .map((route) => {   
              return (
              <MypathContainer onClick={() => handleRouteClick(route.route_id)} key={route.route_id}>
                <Depart> 출발  | {route.startpoint_name} </Depart>
                <Arrival>도착 | {route.endpoint_name}</Arrival>
            </MypathContainer>
              );
            })
        ) : (
          <div>정보가 없습니다.</div>
        )}
      </ContentContainer>
      {isModalOpen && (        
        <Modal
          routeId={routeId}
          isOpen={isModalOpen}
          onClose={()=>setIsModalOpen(false)}
        />
      )}
    </PageContainer>
  );
}

export default MyPathPage;