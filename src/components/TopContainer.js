import React from 'react';
import styled from 'styled-components';
import { FaQuestionCircle, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const LogoText = styled.div`
  font-size: 45px;
  font-weight: bold;
  margin-right: 20px;
`;

const IconContainer = styled.div`
  display: flex;
  gap: 15px;
`;

const IconWrapper = styled.div`
  cursor: pointer;
  font-size: 24px;
  color: #333;
  &:hover {
    color: #B9D673;
  }
`;

const TopContainer = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <LogoText>그린루트</LogoText>
      <IconContainer>
        <IconWrapper>
          <FaQuestionCircle
            title="튜토리얼"
            onClick={() => navigate("/tutorial")}
          />
        </IconWrapper>
        <IconWrapper>
          <FaUser title="마이페이지" onClick={() => navigate("/mypage")} />
        </IconWrapper>
      </IconContainer>
    </Container>
  );
};

export default TopContainer;