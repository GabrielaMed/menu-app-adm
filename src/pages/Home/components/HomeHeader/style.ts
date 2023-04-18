import styled from 'styled-components';

export const Container = styled.header`
  width: 100%;
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  box-sizing: border-box;
  border-bottom: 1px solid black;
`;

export const CartBox = styled.button`
  all: unset;
  background: #ebe5f9;
  width: 2rem;
  height: 2rem;
  padding-inline: 0.5rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const LocationBox = styled.button`
  all: unset;
  padding-inline: 0.5rem;
  gap: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  background: #ebe5f9;
  border-radius: 6px;
`;

export const HoldLocationAndCart = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;
