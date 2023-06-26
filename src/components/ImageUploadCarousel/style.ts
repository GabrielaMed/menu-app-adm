import styled from 'styled-components';

export const ProductImage = styled.img`
  object-fit: cover;
  height: 15rem;

  @media (min-width: 480px) {
    height: 25rem;
  }

  @media (min-width: 700px) {
    min-height: 35rem;
  }

  @media (min-width: 1000px) {
    object-fit: contain;
  }
`;
