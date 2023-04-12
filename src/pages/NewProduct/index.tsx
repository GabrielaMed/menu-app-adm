import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { ChosenTab, Container, Content, Tab } from './style';
import { ProductInfo } from './components/ProductInfo';
import { ProductAdditional } from './components/ProductAdditional';
import { IProduct } from '../../utils/Interface/Product';
import { useParams } from 'react-router-dom';
import { api } from '../../services/api';
import { IToastType } from '../../utils/Interface/Toast';
import { AxiosError } from 'axios';

export const NewProduct = () => {
  const [chosenTab, setchosenTab] = useState('Products');
  const [productData, setProductData] = useState<IProduct>();
  const [showToast, setShowToast] = useState(false);
  const [toastMessageType, setToastMessageType] = useState<IToastType>(
    IToastType.unknow
  );
  const [toastMessage, setToastMessage] = useState('');
  const { productId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`product/${productId}`);

        if (response.data) {
          const { name, description, price } = response.data[0];

          setProductData({ name, description, price });
        }

        const responseAdditional = await api.get(
          `product/${productId}/additionals`
        );

        if (responseAdditional.data.additionals) {
          setProductData({ additional: responseAdditional.data.additionals });
        }

        const responseImages = await api.get(`product/${productId}/image`);
        if (responseImages.data.lenght > 0) {
          setProductData((state: any) => ({
            ...state,
            image: responseImages.data,
          }));
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          setShowToast(true);
          setToastMessageType(IToastType.error);
          setToastMessage(`Error: ${err?.response?.data}`);
        }
      }
    };

    if (productId) {
      fetchData();
    }
  }, [productId]);

  return (
    <Container>
      <Header pageName='Create Product' />
      {productId ? (
        <Tab>
          <ChosenTab onClick={() => setchosenTab('Products')}>
            Produto
          </ChosenTab>

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
        {productId ? (
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
