import React, { useState } from 'react';
import { PageContainer, ContentContainer } from '../../../components/Layout';
import AppBar from '../../../components/AppBar';
import '../../../css/Mypath.css';
import arrowImage from '../../../pages/Home/mypage/Arrow.png';
import heartImage from '../../../pages/Home/mypage/Heart.png';

const PathPage = () => {
    const [clickedStars, setClickedStars] = useState([false, false, false]);

    const handleStarClick = (index) => {
        const newClickedStars = [...clickedStars];
        newClickedStars[index] = !newClickedStars[index];
        setClickedStars(newClickedStars);
    };

    return (
        <PageContainer>
            <AppBar title='내 경로 모아보기' />
            <ContentContainer>
                <div>
                    <div className='tags'>
                        <button className='stress'>#스트레스해소</button>
                        <button className='healing'>#힐링플랜</button>
                        <button className='health'>#건강푸드</button>
                    </div>

                    <div className='route'>
                        <button className='start'>
                            <p className='onStart'>출발지</p>
                            <p>출발지 주소 / 설명 / 이름</p>
                        </button>

                    <img src={arrowImage} alt='arrow' className='arrowIcon1'></img>

                        <button className='viapoint'>
                            <p className='via1'>경유지 1</p>
                            <p>경유지 주소 / 설명 / 이름</p>
                            <img src={heartImage}
                                alt='Star'
                                className={`starIcon1 ${clickedStars[0] ? 'clicked' : ''}`}
                                onClick={() => handleStarClick(0)}
                            />
                        </button>

                    <img src={arrowImage} alt='arrow' className='arrowIcon2'></img>

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

                    <img src={arrowImage} alt='arrow' className='arrowIcon3'></img>

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

                    <img src={arrowImage} alt='arrow' className='arrowIcon4'></img>

                        <button className='destination'>
                            <p className='offStart'>도착지</p>
                            <p>도착지 주소 / 설명 / 이름</p>
                        </button>
                    </div>
                </div>
            </ContentContainer>
        </PageContainer>
    );
};

export default PathPage;