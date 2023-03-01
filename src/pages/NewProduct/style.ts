import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export const Tab = styled.div`
  width: 100%;
  border: 1px solid red;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0.5rem;
  box-sizing: border-box;
`;

export const ChosenTab = styled.button`
  all: unset;
  width: 100%;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

export const Content = styled.div`
  height: 100%;
  width: 100%;
  padding: 1rem;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
`;
