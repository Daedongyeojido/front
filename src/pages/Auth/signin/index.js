import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import TextLogo from './textLogo.svg'
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
    margin-top: 90px;
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

  const handleChange = (name, value) => {
    setUser({ ...user, [name]: value });
  };
  const handleLogin = async () => {
    try {
      const result = await login(user.email, user.password);
      console.log('로그인 성공:', result);
      setUser({ ...user, isLoggedIn: true });
      // 토큰 저장
      localStorage.setItem('token', result.token);
      localStorage.setItem('user_id', result.user_id);
      // 로그인 성공 후 리다이렉트
      navigate('/main');
    } catch (error) {
      if (error.email) {
        setErrors({ email: error.email });
      } else if (error.password) {
        setErrors({ password: error.password });
      } else {
        setErrors({ general: '로그인에 실패했습니다. 다시 시도해주세요.' });
      }
    }
  };

  return (
    <PageContainer style={{ backgroundColor: 'white' }}>
      <ContentContainer>
        <LogoContainer>
          <img src={TextLogo} width='200px' alt="로고" />
        </LogoContainer>
        <LoginTextFrom
          type="email"
          name="email"
          placeholder="이메일을 입력해주세요."
          marginBottom="20px"
          value={user.email}
          onChange={(value) => handleChange('email', value)}
        />
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        <LoginTextFrom
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요."
          value={user.password}
          onChange={(value) => handleChange('password', value)}
        />
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        <Button
          onClick={handleLogin}
          marginTop="50px"
        >로그인</Button>
        {errors.general && <ErrorMessage>{errors.general}</ErrorMessage>}
        <SignupText>
          그린루트가 처음이라면 <SignupLink onClick={() => navigate('/signup')}>회원가입</SignupLink>
        </SignupText>
      </ContentContainer>
    </PageContainer>
  );
};

export default Signin;