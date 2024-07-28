import React from 'react';
import '../../../css/Mytime.css';

const Timetags = ({ date, records = [] }) => {
  return (
    <div className="pathContainer">
      <div className="date">{date}</div>
      {records.length > 0 && (
        records.map((record, index) => (
          <div key={index} className="record">
            <div className="info">
              <div className="dots">
                {record.dots.map((color, i) => (
                  <span key={i} className="dot" style={{ backgroundColor: color }}></span>
                ))}
              </div>
              <div className="details">
                <div className="Start">출발: {record.start}</div>
                <div className="Arrive">도착: {record.end}</div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Timetags;