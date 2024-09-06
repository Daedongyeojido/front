import React from 'react';
import { PageContainer, ContentContainer } from '../../../components/Layout'
import AppBar from '../../../components/AppBar';
import TitleBar from '../../../components/TitleBar';
import TutorialList from '../../../components/TutorialList';
import styled from 'styled-components';
import Liked from '../../../Image/LikedButton.png';

const LikedButtonImg = styled.div`
  width: 100%;
  height: 25px;
  background-image: url('/Images/LikedButton.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  top: 435px;
  left: 2%;
  z-index: 0;
`


function Tutorial() {
    return (
        <PageContainer>
            <AppBar title="튜토리얼" />
            <LikedButtonImg />
            <ContentContainer>
                <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '60px' }}>
                    <TitleBar 
                        width='2.5px;'
                        height= '42px;'
                        background-color= '#575757;' 
                        margin= '3px 15px 0px 0px;'/>
                    <div style={{ fontWeight: 'bold', fontSize: '17px' }}>그린루트, 일상 속 <br /> 웰니스 여정을 떠나보세요!</div>
                </div>
                <TutorialList></TutorialList>
            </ContentContainer>
        </PageContainer>
    );
}
export default Tutorial;

