import React from 'react';
import { PageContainer, ContentContainer } from '../../../components/Layout'
import AppBar from '../../../components/AppBar';
import TitleBar from '../../../components/TitleBar';
import TutorialList from '../../../components/TutorialList';
import GreenHeartImg from '../../../Image/greenheart.png';
import styled from 'styled-components';

const GreenHeartIcon = styled.img`
    position: absolute;
    z-index: 1;
    left: 58%;
    top: 472px;
    width: 25px;
    height: 25px;
`
function Tutorial() {
    return (
        <PageContainer>
            <AppBar title="튜토리얼" />
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
                <GreenHeartIcon src={GreenHeartImg}></GreenHeartIcon>
            </ContentContainer>
        </PageContainer>
    );
}
export default Tutorial;

