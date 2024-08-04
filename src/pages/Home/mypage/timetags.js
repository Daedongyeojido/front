import React from 'react';
import '../../../css/Mypath.css'; 

const Timetags = ({ date, records = [] }) => {
  return (
    <div className="mypathsDateRecordContainer">
      <div className="timetagsDate">{date}</div>
      {records.length > 0 && (
        <div className="mypathRecordsContainer">
          {records.map((record, index) => (
            <div key={index} className={`mypathRecord ${index === 0 ? 'first' : index === records.length - 1 ? 'last' : 'middle'}`}>
              <div className="timetagsInfo">
                <div className="timetagsDotsLabel"></div>
                <div className="timetagsDots">
                  {record.dots.map((color, i) => (
                    <span key={i} className="timetagsDot" style={{ backgroundColor: color }}></span>
                  ))}
                </div>
                <div className="timetagsDetails">
                  <div className="timetagsDetailItem">출발: {record.start}</div>
                  <div className="timetagsDetailItem">도착: {record.end}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Timetags;