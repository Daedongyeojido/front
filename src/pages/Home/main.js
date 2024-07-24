import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { PageContainer, ContentContainer } from '../../components/Layout'

const Header = styled.div`
    width: 100%;
    height: 200px;
    background-image: url('/Images/cloud.png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
`;

const NavButton = styled.div`
    margin: 10px 0;
    padding: 10px;
    background-color: #FFFFFF;
    border-radius: 5px;
    cursor: pointer;
    
    &:hover {
        background-color: #e0e0e0;
    }
`;

function Home() {
    const navigate = useNavigate();
    return (
        <>
        <PageContainer>
            <Header />
            <ContentContainer>

            <NavButton onClick={() => navigate('/tutorial')}>
                튜토리얼 페이지 이동
            </NavButton>

            <NavButton onClick={() => navigate('/mypage')}>
                마이 페이지 이동
            </NavButton>

            <NavButton onClick={() => navigate('/recommend')}>
                경로 추천 페이지 이동
            </NavButton> {/* 윤해: 경로 추천 페이지 추가  */}
            
            </ContentContainer>
        </PageContainer>
        </>
    );
}

export default Home;