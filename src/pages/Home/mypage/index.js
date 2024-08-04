import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer, ContentContainer } from '../../../components/Layout';
import AppBar from '../../../components/AppBar';
import '../../../css/Mypage.css';

function Mypage() {

    const navigate = useNavigate();

    const handleMyPathClick = () => {
        navigate ('/mypath');
    };

    const handleLogoutClick = () => {
        navigate('/signin');
    };

  return (
    <PageContainer>
      <AppBar title='마이페이지' />
      <ContentContainer>
        <div className='userInfo'>
            <div className='userNickName'>"Nickname"님 안녕하세요!</div>
            <div className='userSetting'>
                <div className='userEmail1'>이메일</div>
                <div className='userEmail2'>abc@gmail.com</div>
            </div>
        </div>
        <hr className='divider1' />
        <div className='MyPath' onClick={handleMyPathClick}>내 경로 모아보기</div>
        <hr className='divider2' />
        <div className='MyOut' onClick={handleLogoutClick}>로그아웃</div>
        <hr className='divider3' />
        </ContentContainer>
    </PageContainer>
  );
}

export default Mypage;