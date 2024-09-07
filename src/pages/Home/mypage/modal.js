import React from 'react';
import styled from 'styled-components';

const ModalWhole = styled.div`
  position: fixed; /* 모달을 화면 전체에 고정 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
  z-index: 2000; /* 모달이 앱바 위에 표시되도록 설정 */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto; /* 내용이 넘칠 경우 스크롤 추가 */
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20pxs 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2010; /* 모달 내용이 모달 배경 위에 위치하도록 설정 */
  max-width: 90%; /* 최대 너비 설정 */
  max-height: 80%; /* 최대 높이 설정 */
  overflow: auto; /* 내용이 넘칠 경우 스크롤 추가 */
  width: 35%; /* Ensure it takes full width within its container */
  box-sizing: border-box; /* Include padding in the element's total width and height */
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