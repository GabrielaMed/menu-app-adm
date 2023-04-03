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
  console.log(id, 'id');

  return (
    <Container>
      <Header></Header>
      {id ? (
        <Tab>
          <ChosenTab onClick={() => setchosenTab('Products')}>
            Produto
          </ChosenTab>
          /
          <ChosenTab onClick={() => setchosenTab('Additional')}>
            Adicionais
          </ChosenTab>
        </Tab>
      ) : (
        <Tab>
          <ChosenTab onClick={() => setchosenTab('Products')}>
            Produto
          </ChosenTab>
        </Tab>
      )}

      <Content>
        {id ? (
          chosenTab === 'Products' ? (
            <ProductInfo
              productData={productData!}
              setProductData={setProductData}
            />
          ) : (
            <ProductAdditional
              productData={productData!}
              setProductData={setProductData}
            />
          )
        ) : (
          <ProductInfo
            productData={productData!}
            setProductData={setProductData}
          />
        )}
      </Content>
    </Container>
  );
};
