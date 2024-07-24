import React from 'react'
import { PageContainer} from '../../../components/Layout';
import CloudImg from '../../../Image/Cloud.png';
import styled from 'styled-components';
import InputLocation from '../../../components/InputLocation';

const CloudIcon = styled.img`
    width: 100%;
    height: 131px;
`
const ContentContainer = styled.div`
    padding: 0px 50px;
`
const TopContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
`
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 150px;
`
const LogoText = styled.div`
    font-size: 45px;
    font-weight: bold;
    margin-right: 20px;
`
const Button = styled.div`
    width: 70px;
    height: 40px;
    font-size: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #EEEEEE;
    border-radius: 10px;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
`
const LocationContainer = styled.div`
    width: 100%;
    height: 280px;
    background-color: white;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
function Recommend() {
  return (
    <PageContainer>
        <CloudIcon src={CloudImg}></CloudIcon>
        <ContentContainer>
            <TopContainer>
                <LogoText>그린루트</LogoText>
                <ButtonContainer>
                    <Button>튜토리얼</Button>
                    <Button>마이페이지</Button>
                </ButtonContainer>
            </TopContainer>
            <LocationContainer>
                <InputLocation></InputLocation>
                <InputLocation></InputLocation>
                <InputLocation></InputLocation>
            </LocationContainer>

        
        </ContentContainer>
    </PageContainer>
    
  )
}

export default Recommend;
