import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;
export const Navbar = styled.div`
  width: 100%;
  height: 4rem;
  border-bottom: 1px solid #e6e5e5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  span {
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 24px;
    color: #4b2995;
  }

  span:first-child {
    position: absolute;
    display: flex;
    justify-content: start;
    padding: 1rem;
  }
`;
export const Tab = styled.div`
  width: 100%;
  background-color: #e6e5e5;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0.5rem;
  box-sizing: border-box;
`;

export const ChosenTab = styled.button`
  all: unset;
  width: 100%;
  color: #4b2995;
  display: flex;
  justify-content: center;
  cursor: pointer;

  &:not(:last-child) {
    border-right: 1px solid white;
  }
`;

export const Content = styled.div`
  height: 100%;
  width: 100%;
  padding: 1rem;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
`;
