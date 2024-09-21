import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserMail } from '../../../apis/usermail'; 
import { Logout } from '../../../apis/logout';
import styled from 'styled-components';
import { PageContainer, ContentContainer } from '../../../components/Layout';
import AppBar from '../../../components/AppBar';

const UserInfo = styled.div`
  .name {
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

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
`;

function Mypage() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    nickname: '',
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
      try {
        const data = await UserMail();

        setUserInfo({
          nickname: data.nickname || 'MyUser',
          email: data.email || 'No Email'
        });
      } catch (error) {
        console.error('Failed to fetch user info', error);
        setErrors({ general: error.message || 'Failed to fetch user info' });
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleMyPathClick = () => {
    navigate('/mypath');
  };

  const handleLogoutClick = async () => {
    setLoading(true);
    try {
      // Call the logout API
      await Logout();
  
      // Clear tokens from local storage after successful logout
      localStorage.removeItem('refresh');
      localStorage.removeItem('access');
  
      // Redirect to the sign-in page
      navigate('/signin');
    } catch (error) {
      console.error('Failed to log out', error);
      setErrors({ general: error.message || 'Failed to log out' });
    } finally {
      setLoading(false);
    }
  };  
  
  return (
    <PageContainer>
      <AppBar title='마이페이지' />
      <ContentContainer>
        <UserInfo>
          <div className='name'>
            {loading ? 'Loading...' : userInfo.nickname ? `${userInfo.nickname}님 안녕하세요!` : 'MyUser'}
          </div>
          <div className='userSetting'>
            <div className='userEmail1'>이메일</div>
            <div className='userEmail2'>
              {loading ? 'Loading...' : userInfo.email || 'No Email'}
            </div>
          </div>
        </UserInfo>
        {errors.general && <ErrorMessage>{errors.general}</ErrorMessage>}
        <Divider />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <MyPath onClick={handleMyPathClick}>내 경로 모아보기</MyPath>
            <Divider />
            <MyOut onClick={handleLogoutClick}>로그아웃</MyOut>
            <Divider />
          </>
        )}
      </ContentContainer>
    </PageContainer>
  );
}

export default Mypage;