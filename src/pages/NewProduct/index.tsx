import { useState } from 'react';
import { Header } from '../../components/Header';
import { ChosenTab, Container, Content, Tab } from './style';
import { ProductInfo } from './components/ProductInfo';
import { ProductAdditional } from './components/ProductAdditional';

export const NewProduct = () => {
  const [chosenTab, setchosenTab] = useState('Products');

  return (
    <Container>
      <Header></Header>
      <Tab>
        <ChosenTab onClick={() => setchosenTab('Products')}>Produto</ChosenTab>/
        <ChosenTab onClick={() => setchosenTab('Additional')}>
          Adicionais
        </ChosenTab>
      </Tab>
      <Content>
        {chosenTab === 'Products' ? <ProductInfo /> : <ProductAdditional />}
      </Content>
    </Container>
  );
};
