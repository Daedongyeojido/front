import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer, ContentContainer } from '../../../components/Layout';
import AppBar from '../../../components/AppBar';
import Timetags from './timetags';

const getFormattedDate = (daysAgo) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

function MyPathPage() {
  const todayDate = getFormattedDate(0);
  const yesterdayDate = getFormattedDate(1);
  const dayBeforeYesterdayDate = getFormattedDate(2);
  const navigate = useNavigate();

  const data = [
    {
      date: todayDate,
      records: [
        { dots: ['#F9B8BC', '#7079BC', '#59AF7E'], start: '', end: '' }
      ]
    },
    {
      date: yesterdayDate,
      records: [
        { dots: ['#F9B8BC', '#7079BC', '#59AF7E'], start: '', end: '' }
      ]
    },
    {
      date: dayBeforeYesterdayDate,
      records: [
        { dots: ['#F9B8BC', '#7079BC', '#59AF7E'], start: '', end: '' }
      ]
    }
  ];

  const tags = [
    { text: '#차분힐링', color: '#59AF7E' },
    { text: '#초록초록', color: '#59AF7E' },
    { text: '#피로회복', color: '#7079BC' },
    { text: '#도파민디톡스', color: '#F9B8BC' },
    { text: '#에너지넘치는', color: '#F9B8BC' }
  ];

  const handleDateClick = () => {
    navigate('/paths');
  };

  return (
    <PageContainer>
      <AppBar title='마이페이지' />
      <div className="tagsContainer">
        <div className="tagsRow">
          {tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="tag" style={{ backgroundColor: tag.color }}>
              {tag.text}
            </span>
          ))}
        </div>
        <div className="tagsRow large">
          {tags.slice(3).map((tag, index) => (
            <span key={index} className="tag" style={{ backgroundColor: tag.color }}>
              {tag.text}
            </span>
          ))}
        </div>
      </div>
      <ContentContainer>
        {data.map((item, index) => (
          <div key={index} onClick={handleDateClick}>
            <Timetags
              date={item.date}
              records={item.records}
            />
          </div>
        ))}
      </ContentContainer>
    </PageContainer>
  );
}

export default MyPathPage;