import React from 'react'
import Cloud from '../../../Image/Cloud.png';
import styled from 'styled-components';
import InputLocation from '../../../components/InputLocation';
import FootPrint from '../../../Image/FootPrint.png';
import Departure from '../../../Image/DepartureImg.png';
import Arrival from '../../../Image/ArrivalImg.png';
import Button from '../../../components/Button';

const PageContainer = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`
const CloudImg = styled.img`
    width: 100%;
    height: 131px;
`
const FootPrintImg = styled.img`
    position: absolute;
    z-index: 1;
    top: 36%;
    left: 65.5%;
    width: 169px;
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
// const Button = styled.div`
//     width: 70px;
//     height: 40px;
//     font-size: 13px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     background-color: #EEEEEE;
//     border-radius: 10px;
//     box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
// `
const LocationContainer = styled.div`
    width: 100%;
    height: 330px;
    background-color: white;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 2;
`
function Recommend() {
  return (
    <PageContainer>
        <CloudImg src={Cloud}></CloudImg>
        <FootPrintImg src={FootPrint}></FootPrintImg>
        <ContentContainer>
            <TopContainer>
                <LogoText>그린루트</LogoText>
                <ButtonContainer>
                    <Button 
                        color='black'
                        fontSize= '13px'
                        width='85%' 
                        height='42px' 
                        backgroundColor='#EEEEEE' 
                        borderRadius='10px' 
                        customStyle='box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
                            margin-right: 10px;'>
                        튜토리얼
                    </Button>
                    <Button 
                        color='black' 
                        fontSize= '12px' 
                        height='42px' 
                        backgroundColor='#EEEEEE' 
                        borderRadius='10px' 
                        customStyle='box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);'>마이페이지</Button>
                </ButtonContainer>
            </TopContainer>
            <LocationContainer>
                <InputLocation icon = {Departure} text='출발지를 입력해주세요' />
                <InputLocation icon = {Arrival} text='도착지를 입력해주세요' />
                <InputLocation text='추천받고 싶은 않은 장소가 있어요!'></InputLocation>
                <Button fontSize= '20px' width='60%' height='49px' borderRadius='30px' backgroundColor='#789DDD'>GO</Button>

            </LocationContainer>
        </ContentContainer>
    </PageContainer>
    
  )
}
export default Recommend;
