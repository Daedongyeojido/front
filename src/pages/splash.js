import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer, ContentContainer } from '../components/Layout';
import styled, { keyframes } from 'styled-components';
import logo from './Auth/signin/logo.png';

const fadeInOut = keyframes`
    0% { opacity: 0; }
    50% { opacity: 1; }
`;

const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 150px;
    margin-bottom: 70px;
    animation: ${fadeInOut} 3s ease-in-out;
    animation-fill-mode: forwards;
`;

const Text = styled.p`
    color: ${({theme}) => theme.darkgrayColor};
    font-size: 25px;
    text-align: center;
    animation: ${fadeInOut} 3s ease-in-out;
    animation-fill-mode: forwards;
`;

const SplashWrapper = styled.div`
    display: {isHidden ? 'none' : 'block'};
`;

const SplashScreen = () => {
    const navigate = useNavigate();
    const [isHidden, setIsHidden] = useState(false);

  //TODO: 인증된 사용자면 홈 화면으로 이동, 그렇지 않으면 로그인 페이징로 이동
  //로그인, 회원가입 api 붙일 때 로직 점검하기

    useEffect(() => {
        const checkAuth = () => {
            const isAuthenticated = false;
            return isAuthenticated;
            };

        const timer = setTimeout(() => {
        setIsHidden(true);
        if (checkAuth()) {
            navigate('/main');
        } else {
            navigate('/signin');
        }
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <SplashWrapper isHidden={isHidden}>
        <PageContainer style={{ backgroundColor: 'white' }}>
            <ContentContainer>
            <LogoContainer>
                <img src={logo} width='200px' alt="로고" />
            </LogoContainer>
            <Text>
                일상 속 건강한 여정을 떠나요
            </Text>
            </ContentContainer>
        </PageContainer>
        </SplashWrapper>
    );
    };

export default SplashScreen;