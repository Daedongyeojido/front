import React, { useState } from 'react';
import { PageContainer, ContentContainer } from '../../../components/Layout';
import AppBar from '../../../components/AppBar';
import '../../../css/Paths.css';
import arrowImage from '../../../pages/Home/mypage/Arrow.png';
import heartImage from '../../../pages/Home/mypage/Heart.png';

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
      <ContentContainer > 
        <div>
          {/* 해시태그 표시 */}
          <div className='pathsContainer'>
            <div className='pathsTagRow'>
              {tagsRow1.map((tag, index) => (
                <button key={index} className='pathsTag' style={{ backgroundColor: tag.color }}>
                  {tag.text}
                </button>
              ))}
            </div>

            <div className='tagsLarge'>
              {tagsRow2.map((tag, index) => (
                <button key={index} className='pathsTag' style={{ backgroundColor: tag.color }}>
                  {tag.text}
                </button>
              ))}
            </div>
          </div>

          <div className='route'>
            <button className='start'>
              <p className='onStart'>출발지</p>
              <p>출발지 주소 / 설명 / 이름</p>
            </button>

            <img src={arrowImage} alt='arrow' className='arrowIcon1' />

            <button className='viapoint'>
              <p className='via1'>경유지 1</p>
              <p>경유지 주소 / 설명 / 이름</p>
              <img
                src={heartImage}
                alt='Star'
                className={`starIcon1 ${clickedStars[0] ? 'clicked' : ''}`}
                onClick={() => handleStarClick(0)}
              />
            </button>

            <img src={arrowImage} alt='arrow' className='arrowIcon2' />

            <button className='viapoint'>
              <p className='via2'>경유지 2</p>
              <p>경유지 주소 / 설명 / 이름</p>
              <img
                src={heartImage}
                alt='Star'
                className={`starIcon2 ${clickedStars[1] ? 'clicked' : ''}`}
                onClick={() => handleStarClick(1)}
              />
            </button>

            <img src={arrowImage} alt='arrow' className='arrowIcon3' />

            <button className='viapoint'>
              <p className='via3'>경유지 3</p>
              <p>경유지 주소 / 설명 / 이름</p>
              <img
                src={heartImage}
                alt='Star'
                className={`starIcon3 ${clickedStars[2] ? 'clicked' : ''}`}
                onClick={() => handleStarClick(2)}
              />
            </button>

            <img src={arrowImage} alt='arrow' className='arrowIcon4' />

            <button className='destination'>
              <p className='offStart'>도착지</p>
              <p>도착지 주소 / 설명 / 이름</p>
            </button>
          </div>

          {/* 모달 창 */}
          {showModal && (
            <div className='modalWhole'>
              <div className='modalContent'>
                <span className='modalClose' onClick={() => setShowModal(false)}>×</span>
                <p>모달 내용</p>
              </div>
            </div>
          )}
        </div>
      </ContentContainer>
    </PageContainer>
  );
};

export default PathPage;