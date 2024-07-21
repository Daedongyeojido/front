    import React, { useState } from 'react';
    import { useRecoilState } from 'recoil';
    import styled from 'styled-components';
    import { userState } from '../../../recoils/Auth';
    import { PageContainer, ContentContainer } from '../../../components/Layout';
    import LoginTextFrom from '../../../components/Input';
    import Button from '../../../components/Button';
    import { checkNicknameDuplicate, checkEmailDuplicate } from '../../../apis/auth';
    import AppBar from '../../../components/AppBar';
    import { useNavigate } from 'react-router-dom';


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
    
    const InputGroup = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    `;

    const InputWrapper = styled.div`
    width: 70%;
    `;

    const ButtonWrapper = styled.div`
    width: 25%;
    `;

    const Label = styled.label`
        display: block;
        margin-bottom: 5px;
        text-align: left;
        font-size: 15px;
        color: ${props => props.theme.buttonColor};
    `;


    const SignupButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    width: 100%;
    margin-top: 50px;  // 상단 여백 추가
    `;
    const Signup = () => {
    const navigate = useNavigate();

    const [user, setUser] = useRecoilState(userState);
    const [errors, setErrors] = useState({});
    const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);
    const [isEmailAvailable, setIsEmailAvailable] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleNicknameCheck = async () => {
        try {
        const result = await checkNicknameDuplicate(user.nickname);
        setIsNicknameAvailable(result.isAvailable);
        } catch (error) {
        setErrors({ ...errors, nickname: '닉네임 중복 확인 중 오류가 발생했습니다.' });
        }
    };

    const handleEmailCheck = async () => {
        try {
        const result = await checkEmailDuplicate(user.email);
        setIsEmailAvailable(result.isAvailable);
        } catch (error) {
        setErrors({ ...errors, email: '이메일 중복 확인 중 오류가 발생했습니다.' });
        }
    };

        return (
            <PageContainer style={{ backgroundColor: 'white' }}>
            <AppBar title="회원가입" />
            <ContentContainer>
                <Title>그린루트에 오신 것을<br />환영합니다</Title>
        
                <InputGroupWrapper>
                    <Label>닉네임</Label>
                    <InputGroup>
                    <InputWrapper>
                        <LoginTextFrom
                        value={user.nickname}
                        type="text"
                        placeholder="닉네임을 입력해주세요."
                        onChange={(value) => handleChange({ target: { name: 'nickname', value } })}
                        />
                    </InputWrapper>
                    <ButtonWrapper>
                        <Button 
                        onClick={handleNicknameCheck}
                        fontSize="15px"
                        height="55px"
                        >
                        {isNicknameAvailable ? '사용 가능' : '중복확인'}
                        </Button>
                    </ButtonWrapper>
                    </InputGroup>
                    {errors.nickname && <ErrorMessage>{errors.nickname}</ErrorMessage>}
                </InputGroupWrapper>
        
                <InputGroupWrapper>
                    <Label>이메일</Label>
                    <InputGroup>
                    <InputWrapper>
                        <LoginTextFrom
                        value={user.email}
                        type="email"
                        placeholder="이메일을 입력해주세요."
                        onChange={(value) => handleChange({ target: { name: 'email', value } })}
                        />
                    </InputWrapper>
                    <ButtonWrapper>
                        <Button 
                        onClick={handleEmailCheck}
                        fontSize="15px"
                        height="55px"
                        >
                        {isEmailAvailable ? '사용 가능' : '중복확인'}
                        </Button>
                    </ButtonWrapper>
                    </InputGroup>
                    {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                </InputGroupWrapper>
        
                <InputGroupWrapper>
                    <Label>비밀번호</Label>
                    <LoginTextFrom
                    value={user.password}
                    type="password"
                    placeholder="비밀번호를 입력해주세요."
                    />
                    {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
                </InputGroupWrapper>

                <InputGroupWrapper>
                    <Label>비밀번호 확인</Label>
                    <LoginTextFrom
                    value={user.confirmPassword}
                    type="password"
                    placeholder="비밀번호를 재확인해주세요."
                    />
                    {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
                </InputGroupWrapper>

                <SignupButtonWrapper>
                <Button 
                    onClick={() => navigate('/')}
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