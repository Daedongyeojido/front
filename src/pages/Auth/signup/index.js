import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { userState } from "../../../recoils/Auth";
import { PageContainer, ContentContainer } from "../../../components/Layout";
import LoginTextFrom from "../../../components/Input";
import Button from "../../../components/Button";
import {
  signup
} from "../../../apis/auth";
import AppBar from "../../../components/AppBar";
import { useNavigate } from "react-router-dom";

const Title = styled.h1`
  font-size: 26px;
  margin-bottom: 80px;
  text-align: left;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin: 0;
  position: absolute;
  left: 0;
`;

const InputGroupWrapper = styled.div`
  position: relative;
  margin-bottom: 25px;
`;

// const InputGroup = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   width: 100%;
// `;

// const InputWrapper = styled.div`
//   width: 70%;
// `;

// const ButtonWrapper = styled.div`
//   width: 25%;
// `;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  text-align: left;
  font-size: 15px;
  color: ${(props) => props.theme.buttonColor};
`;

const SignupButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  width: 100%;
  margin-top: 50px; // 상단 여백 추가
`;

const Signup = () => {
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userState);
    const [errors, setErrors] = useState({});
  
    // const handleChange = (name, value) => {
    //   setUser({ ...user, [name]: value });
    // };

    const handleChange = (name, value) => {
      setUser((prevUser) => {
          const updatedUser = { ...prevUser, [name]: value };
          console.log('Updated User:', updatedUser); // 확인용 로그
          return updatedUser;
      });
  };
  
    const handleSignup = async () => {
      try {
          const signupData = {
              nickname: user.nickname,
              email: user.email,
              password: user.password,
          };
          const result = await signup(signupData);
          console.log('회원가입 성공', result);
          navigate('/signin');
      } catch (error) {
        if (error.errorList) {
          setErrors({ general: error.errorList.join('\n') });
        } else if (typeof error === 'object') {
          setErrors(error);
        } else {
          setErrors({ general: '회원가입 중 오류가 발생했습니다.' });
        }
      }
    };
  
    return (
      <PageContainer style={{ backgroundColor: 'white' }}>
        <AppBar title="회원가입" />
        <ContentContainer>
          <Title>그린루트에 오신 것을<br />환영합니다</Title>
  
          <InputGroupWrapper>
            <Label>닉네임</Label>
            <LoginTextFrom
              value={user.nickname}
              type="text"
              name="nickname"
              placeholder="닉네임을 입력해주세요."
              onChange={(value) => handleChange('nickname', value)}
            />
            {errors.nickname && <ErrorMessage>{errors.nickname}</ErrorMessage>}
          </InputGroupWrapper>
  
          <InputGroupWrapper>
            <Label>이메일</Label>
            <LoginTextFrom
              value={user.email}
              type="email"
              name="email"
              placeholder="이메일을 입력해주세요."
              onChange={(value) => handleChange('email', value)}
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </InputGroupWrapper>
  
          <InputGroupWrapper>
            <Label>비밀번호</Label>
            <LoginTextFrom
              value={user.password}
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요."
              onChange={(value) => handleChange('password', value)}
            />
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </InputGroupWrapper>

          <SignupButtonWrapper>
            <Button 
              onClick={handleSignup}
              width="80%"
            >
              회원가입
            </Button>
          </SignupButtonWrapper>
          {errors.general && <ErrorMessage>{errors.general}</ErrorMessage>}
        </ContentContainer>
      </PageContainer>
    );
  };
  
  export default Signup;
