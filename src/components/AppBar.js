import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const AppBarContainer = styled.div`
  display: flex;
  align-items: center;
  height: 56px;
  background-color: #FFFFFF;
  padding: 0 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 8px;
  margin-right: 16px;
`;

const Title = styled.h1`
  font-size: 18px;
  margin: 0;
`;

function AppBar({ title }) {
  const navigate = useNavigate();

  let goBack = () => {
    navigate(-1);
  };

  return (
    <AppBarContainer>
      <BackButton>
        <FontAwesomeIcon
          icon={faAngleLeft}
          onClick={goBack}
        />
      </BackButton>      
      <Title>{title}</Title>
    </AppBarContainer>
  );
}

AppBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default AppBar;