import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserMail } from "../../../apis/auth"; // Ensure the import path is correct
import styled from 'styled-components';
import { PageContainer, ContentContainer } from '../../../components/Layout';
import AppBar from '../../../components/AppBar';

const UserInfo = styled.div`
  .username {
    font-size: 25px;
    font-weight: bold;
    text-align: center;
    display: grid;
  }

  .userSetting {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 50px;
  }

  .userEmail1, .userEmail2 {
    font-size: 15px;
    font-weight: bold;
    margin-top: 40px;
  }
`;

const MyPath = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin: 10px;
  cursor: pointer;
`;

const MyOut = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin: 10px;
  cursor: pointer;
`;

const Divider = styled.hr`
  border-top: 1px solid #000;
  margin: 20px 0;
`;

function Mypage() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ username: '', email: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await UserMail();
        setUserInfo({
          username: data.username || 'User',
          email: data.email || 'No Email'
        });
      } catch (error) {
        console.error('Failed to fetch user info', error);
        setErrors({ general: error.general || 'Failed to fetch user info' });
      }
    };

    fetchUserInfo();
  }, []);

  const handleMyPathClick = () => {
    navigate('/mypath');
  };

  const handleLogoutClick = () => {
    navigate('/signin');
  };

    return (
    <PageContainer>
      <AppBar title='마이페이지' />
      <ContentContainer>
        <UserInfo>
          <div className='username'>
            {userInfo.username ? `${userInfo.username}님 안녕하세요!` : 'Loading...'}
          </div>
          <div className='userSetting'>
            <div className='userEmail1'>이메일</div>
            <div className='userEmail2'>
              {userInfo.email || 'Loading...'}
            </div>
          </div>
        </UserInfo>
        <Divider />
        <MyPath onClick={handleMyPathClick}>내 경로 모아보기</MyPath>
        <Divider />
        <MyOut onClick={handleLogoutClick}>로그아웃</MyOut>
        <Divider />
      </ContentContainer>
    </PageContainer>
  );
}


export default Mypage;