import React, { useDebugValue, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { RouteDataState } from '../../../recoils/Location';
import {showDetailRoute} from '../../../apis/showDetailRoute';

const ModalWhole = styled.div`
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
`;

const ModalContent = styled.div`
  background-color: #E9F0D8;
  padding: 20px 60px;
  width: 70%;
  max-width: 400px;
  height: 90%;
  max-height: 600px;
  display: flex;
  flex-direction: column;
  z-index: 1001;
  border-radius: 10px;
  scroll-behavior: auto;
  cursor: default;
  overflow-y: auto; 

  &::-webkit-scrollbar {
    display: none; 
  }
`;

const ModalClose = styled.span`
  position: absolute;
  top: 5px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
  z-index: 2011;
`;

const Modal = ({ isOpen, onClose, children }) => {

  const { routeData} = useRecoilValue(RouteDataState); // Recoil에서 전역 상태 가져오기
  console.log(routeData);
  
  useEffect(() => {
    const handleShowRoute = async () => {
      try {
          const data = await showDetailRoute();

          console.log('Received dsata:', data); // 응답 데이터 확인
  
          if (data.route && data.route.places.length > 0) {

          } else {
            console.warn('No route data available');
          }
        
      } catch (error) {
        console.error("Error fetching route:", error.message);
      }
    };
    handleShowRoute();
  }, []);
  if (!isOpen) return null;

  return (
    <ModalWhole onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalClose onClick={onClose}>&times;</ModalClose>
        {children}
      </ModalContent>
    </ModalWhole>
  );
};

export default Modal;