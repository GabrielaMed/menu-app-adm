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

export const Content = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 1rem;
  padding-inline: 1rem;
  gap: 1rem;
`;

export const Cards = styled.div`
  gap: 1rem;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 400px) {
    justify-content: center;
  }
`;

export const Title = styled.h1`
  color: black;
`;

export const SearchBar = styled.input`
  all: unset;
  width: 100%;
  border: 1px solid #e6e5e5;
  border-radius: 6px;
  padding: 0.5rem;

  :focus {
    border: 1px solid #4b2995;
  }
`;

export const Card = styled.div`
  width: 10rem;
  height: 13rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  background-color: #f3f2f2;
  border-radius: 6px 36px;
  cursor: pointer;
`;

export const ImageBox = styled.div`
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-height: 3.5rem;
  border-radius: 5px;
  overflow: hidden;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
`;

export const TextBox = styled.div`
  width: 100%;
  max-height: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const DescriptionBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
`;

export const FooterBox = styled.div`
  width: 100%;
  height: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`;

export const ButtonAddProduct = styled.button`
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
