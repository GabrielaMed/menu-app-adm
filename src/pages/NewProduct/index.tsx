import { useState } from 'react';
import { Header } from '../../components/Header';
import { ChosenTab, Container, Content, Tab } from './style';
import { ProductInfo } from './components/ProductInfo';
import { ProductAdditional } from './components/ProductAdditional';
import { IProduct } from '../../utils/Interface/Product';
import { useParams } from 'react-router-dom';

export const NewProduct = () => {
  const [chosenTab, setchosenTab] = useState('Products');
  const [productData, setProductData] = useState<IProduct>();
  const { id } = useParams();

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
        {id ? (
          <ProductInfo
            productData={productData!}
            setProductData={setProductData}
          />
        ) : chosenTab === 'Products' ? (
          <ProductInfo
            productData={productData!}
            setProductData={setProductData}
          />
        ) : (
          <ProductAdditional
            productData={productData!}
            setProductData={setProductData}
          />
        )}
      </Content>
    </Container>
  );
};
