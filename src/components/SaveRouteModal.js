import React, { useRef, useState } from 'react'
import styled from 'styled-components';
import ConfirmImg from '../Image/ConfirmImg.png';
import UseOnClickOutside from '../hooks/UseOnClickOutside';

const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2); 
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    cursor: pointer; 
`
const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px 60px;
  width: 70%;
  max-width: 400px;
  height: 30%;
  max-height: 600px;
  display: flex;
  flex-direction: column;
  z-index: 1001;
  border-radius: 30px;
  scroll-behavior: auto;
  cursor: default;
  overflow-y: auto; 

  &::-webkit-scrollbar {
    display: none; 
  }
  justify-content: center;
  align-items: center;
  `
 
  const Title = styled.div`
    color: #000;
    font-size: 20px;
  `
  const ConfirmIcon = styled.img`
    width: 30%; 
    margin-bottom: 20px;
  `

function SaveRouteModal({ setModalOpen }) {
    const ref = useRef();
    UseOnClickOutside(ref, () => {setModalOpen(false)})

  return ( 
    <Modal>
        <ModalContent className='ModalContent' ref={ref}>
            <ConfirmIcon src={ConfirmImg} />
            <Title>
            경로가 저장되었습니다.
            </Title>
        </ModalContent>
    </Modal>
    
  )
}

export default SaveRouteModal