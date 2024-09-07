import React, { useState } from 'react';
import styled from 'styled-components';
import { PageContainer, ContentContainer } from '../../../components/Layout';
import AppBar from '../../../components/AppBar';
import Modal from './modal';
import PathPage from './paths';

const HashtagContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px 0 5px;
  margin-top: 10px;
`;

const TagsRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 65%;
  max-width: 600px;
`;

const Hashtags = styled.span`
  display: inline-block;
  padding: 8px 10px;
  border-radius: 12px;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  justify-content: center;
  align-items: center;
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
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: 340px;
  height: 100px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const DepartandArrival = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
  flex-direction: column;
  gap: 12px;
`;

const Depart = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-left: 30px;
  color: #555;
`;

const Arrival = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-left: 30px;
  color: #555;
`;

const DotsContainer = styled.div`
  display: flex;
  gap: 7px;
  margin-top: 2px;
  margin-left: 17px;
`;

const Dot = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  cursor: pointer;
`;

const MypathContainerTwo = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 170px;
  left: 50%;
  transform: translateX(-50%);
  width: 340px;
  height: 100px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const MypathContainerThree = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 290px;
  left: 50%;
  transform: translateX(-50%);
  width: 340px;
  height: 100px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

function MyPathPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [dotColors, setDotColors] = useState([]);

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

  const handleDateClick = () => {
    setIsModalOpen(true);
  };

  const handleDotClick = (event, color) => {
    event.stopPropagation(); // Prevents the event from bubbling up to the container
    setDotColors((prevColors) => prevColors.filter((c) => c !== color));
  };

  return (
    <PageContainer>
      <AppBar title="마이페이지" />
      <HashtagContainer>
        <TagsRow>
          {tags.slice(0, 3).map((tag, index) => (
            <Hashtags
              key={index}
              className={selectedTags.includes(tag.text) ? 'selected' : ''}
              style={{ backgroundColor: tag.color }}
            >
              {tag.text}
            </Hashtags>
          ))}
        </TagsRow>
        <TagsRow>
          {tags.slice(3).map((tag, index) => (
            <Hashtags
              key={index}
              className={selectedTags.includes(tag.text) ? 'selected' : ''}
              style={{ backgroundColor: tag.color }}
            >
              {tag.text}
            </Hashtags>
          ))}
        </TagsRow>
      </HashtagContainer>
      <ContentContainer>
        <DateLabel>Date</DateLabel>
        <MypathContainer onClick={handleDateClick}>
          <DepartandArrival>
            <DotsContainer>
              {dotColors.map((color, index) => (
                <Dot key={index} color={color} onClick={(event) => handleDotClick(event, color)} />
              ))}
            </DotsContainer>
            <Depart>출발  | </Depart>
            <Arrival>도착 | </Arrival>
          </DepartandArrival>
        </MypathContainer>
        <MypathContainerTwo onClick={handleDateClick}>
          <DepartandArrival>
          </DepartandArrival>
        </MypathContainerTwo>
        <MypathContainerThree onClick={handleDateClick}>
          <DepartandArrival>
            <DotsContainer>
              {dotColors.map((color, index) => (
                <Dot key={index} color={color} onClick={(event) => handleDotClick(event, color)} />
              ))}
            </DotsContainer>
            <Depart>출발  | </Depart>
            <Arrival>도착 | </Arrival>
          </DepartandArrival>
        </MypathContainerThree>
      </ContentContainer>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <PathPage
          onTagColorChange={(color) => setDotColors((prevColors) => {
            const newColors = new Set(prevColors);
            newColors.add(color);
            if (newColors.size > 5) {
              const colorsArray = Array.from(newColors);
              newColors.delete(colorsArray[0]);
            }
            return Array.from(newColors);
          })}
          onCloseModal={() => setIsModalOpen(false)}
        />
      </Modal>
    </PageContainer>
  );
}

export default MyPathPage;