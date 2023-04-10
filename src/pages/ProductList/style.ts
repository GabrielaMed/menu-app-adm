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
  box-sizing: border-box;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const Card = styled.div`
  width: 100%;
  height: 5rem;
  padding: 1rem;
  display: flex;
  box-sizing: border-box;
  overflow: hidden;
  background-color: #ecf9ee;
  border-radius: 5px;
  box-shadow: 4px 4px 11px 0px rgba(0, 0, 0, 0.2);
`;
