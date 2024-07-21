    import React, { useState } from 'react';
    import { useRecoilState } from 'recoil';
    import styled from 'styled-components';
    import logo from './logo.png'
    import { userState } from '../../../recoils/Auth';
    import { PageContainer, ContentContainer } from '../../../components/Layout';
    import LoginTextFrom from '../../../components/Input';
    import Button from '../../../components/Button';
    import { login } from '../../../apis/auth';
    import { useNavigate } from 'react-router-dom';

    const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 150px;
    margin-bottom: 70px;
    `;

    const SignupText = styled.p`
    text-align: center;
    margin-top: 20px;
    font-weight: bold;
    color: ${props => props.theme.lightgrayColor};
    `;

    const SignupLink = styled.span`
    color: ${props => props.theme.mainColor};
    cursor: pointer;
    margin-left: 10px;
    `;

    const ErrorMessage = styled.p`
    color: red;
    margin-top: 5px;
    `;


    const Signin = () => {
        const navigate = useNavigate();

    const [user, setUser] = useRecoilState(userState);
    const [errors, setErrors] = useState({});


    const validateForm = () => {
        let isValid = true;
        let newErrors = {};

        if (!user.email) {
        newErrors.email = '이메일을 입력해주세요.';
        isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(user.email)) {
        newErrors.email = '올바른 이메일 형식이 아닙니다.';
        isValid = false;
        }

        if (!user.password) {
        newErrors.password = '비밀번호를 입력해주세요.';
        isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleLogin = async () => {

        if (validateForm()) {
        try {
            const result = await login(user.email, user.password);
            // 로그인 성공 처리
            console.log('로그인 성공:', result);
            setUser({ ...user, isLoggedIn: true });
            // 여기서 로그인 성공 후의 로직을 추가할 수 있습니다.
            // 예: 토큰 저장, 리다이렉트 등
        } catch (error) {
            // 에러 처리
            setErrors({ ...errors, general: '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.' });
        }
        }
    };

    return (
        <PageContainer style={{ backgroundColor: 'white' }}>
        <ContentContainer>
            <LogoContainer>
            <img src={logo} width='200px' alt="로고" />
            </LogoContainer>
            <LoginTextFrom
            type="email"
            name="email"
            placeholder="이메일을 입력해주세요."
            marginBottom="20px"
            value={user.email}
            />
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}

            <LoginTextFrom
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요."
            value={user.password}
            />
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}

            <Button 
            onClick={handleLogin}
            marginTop="50px">로그인</Button>
            {errors.general && <p>{errors.general}</p>}
            <SignupText>
                그린루트가 처음이라면 <SignupLink onClick={() => navigate('/signup')}>회원가입</SignupLink>
            </SignupText>
        </ContentContainer>
        </PageContainer>
    );
    };

    export default Signin;