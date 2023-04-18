import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export const Content = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 1rem;
  padding-inline: 2rem;
  gap: 1rem;
`;

export const Cards = styled.div`
  gap: 1rem;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const Title = styled.h1`
  color: black;
`;

export const Card = styled.div`
  width: 10rem;
  height: 13rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  position: relative;
  background-color: #f3f2f2;
  border-radius: 6px 36px;
`;

export const ImageBox = styled.div`
  background-image: url(../../utils/Image.png);
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 3rem;
`;

export const TextBox = styled.div`
  width: 100%;
  height: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FooterBox = styled.div`
  width: 100%;
  height: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`;

export const CartBox = styled.button`
  all: unset;
  background: #4b2995;
  width: 2rem;
  height: 2rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
