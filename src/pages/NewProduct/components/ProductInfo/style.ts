import styled from 'styled-components';

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-size: 16px;
`;

export const InputPhoto = styled.input`
  all: unset;
  height: 2rem;
  border: 1px solid #002855;
  border-radius: 2px;
  padding-left: 0.5rem;
  font-size: 14px;
`;

export const Input = styled.input`
  all: unset;
  background: #4d6e9570;
  height: 2rem;
  border-bottom: 1px solid #002855;
  border-radius: 2px;
  padding-left: 0.5rem;
  font-size: 14px;
`;

export const Textarea = styled.textarea`
  all: unset;
  background: #4d6e9570;
  height: 4rem;
  border-bottom: 1px solid #002855;
  border-radius: 2px;
  padding-left: 0.5rem;
  padding-top: 0.5rem;
  box-sizing: border-box;
  resize: none;
  font-size: 14px;
`;
