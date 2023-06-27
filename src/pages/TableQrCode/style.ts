import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export const Content = styled.div`
  height: 100%;
  width: 100%;
  padding-top: 1rem;
  padding-inline: 2rem;
  gap: 1rem;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  justify-content: center;
  flex-wrap: wrap;
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

export const Card = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 1rem;
  gap: 1rem;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden;
  /* background-color: #4b2995; */
  border-radius: 5px;
  box-shadow: 4px 4px 11px 0px rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

export const ButtonAddTable = styled.button`
  all: unset;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: #4b2995;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Footer = styled.footer`
  height: 7rem;
  gap: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 1rem;
`;
