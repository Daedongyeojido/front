/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  height: ${props => props.height || '55px'};
  padding: ${props => props.padding || '2px 15px 0'};
  background-color: ${props => props.backgroundColor || 'white'};
  border-radius: ${props => props.borderRadius || '12px'};
  border: ${props => props.border || `1px solid ${props.theme.lightgrayColor}`};
  display: flex;
  align-items: center;
  width: ${props => props.width || '100%'};
  margin-top: ${props => props.marginTop || '0'};
  margin-bottom: ${props => props.marginBottom || '0'};
  ${props => props.customStyle}
`;

const StyledInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: ${props => props.fontSize || '16px'};
  background-color: transparent;
  &::placeholder {
    color: ${props => props.placeholderColor || props.theme.lightgrayColor};
  }
`;

const SuffixText = styled.span`
  font-size: ${props => props.suffixFontSize || '14px'};
  color: ${props => props.suffixColor || props.theme.lightgrayColor};
`;

const LoginTextFrom = ({
  value,
  onChange,
  type = 'text',
  placeholder,
  validator,
  maxLength,
  height,
  padding,
  backgroundColor,
  borderRadius,
  border,
  width,
  marginTop,
  marginBottom,
  fontSize,
  placeholderColor,
  suffixFontSize,
  suffixColor,
  customStyle,
  ...props
}) => {
  const [inputValue, setInputValue] = useState(value || '');

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
    if (validator) {
      validator(newValue);
    }
  };

  const getSuffixText = () => {
    if (maxLength) {
      return `${inputValue.length}/${maxLength}`;
    }
    return null;
  };

  return (
    <InputContainer
      height={height}
      padding={padding}
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
      border={border}
      width={width}
      marginTop={marginTop}
      marginBottom={marginBottom}
      customStyle={customStyle}
    >
      <StyledInput
        type={type}
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={maxLength}
        fontSize={fontSize}
        placeholderColor={placeholderColor}
        {...props}
      />
      {getSuffixText() && (
        <SuffixText
          suffixFontSize={suffixFontSize}
          suffixColor={suffixColor}
        >
          {getSuffixText()}
        </SuffixText>
      )}
    </InputContainer>
  );
};

export default LoginTextFrom;