import { useNavigate } from 'react-router-dom';
import {
  Card,
  Cards,
  CartBox,
  Container,
  Content,
  FooterBox,
  ImageBox,
  TextBox,
  Title,
} from './style';
import { Header } from '../../components/Header';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { IProduct } from '../../utils/Interface/Product';
import { IToastType } from '../../utils/Interface/Toast';
import { api } from '../../services/api';
import ReactLoading from 'react-loading';
import { MdShoppingCart } from 'react-icons/md';
import { HomeHeader } from './components/HomeHeader';

export const Home = () => {
  const companyId = `${process.env.REACT_APP_COMPANY_ID}`;
  const [loading, setLoading] = useState(false);
  const [productsData, setProductsData] = useState<IProduct[]>([]);
  const [productsWImageData, setProductsWImageData] = useState<IProduct[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessageType, setToastMessageType] = useState<IToastType>(
    IToastType.unknow
  );
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`${companyId}/product`);
        if (response.data) {
          setProductsData(response.data);
        }
      } catch (err) {
        console.log(err);
        if (err instanceof AxiosError) {
          setShowToast(true);
          setToastMessageType(IToastType.error);
          setToastMessage(`Error: ${err?.response?.data}`);
        }
      }
    };

    if (companyId) {
      fetchData();
    }
  }, [companyId]);

  useEffect(() => {
    const setPhoto = async (index: number) => {
      if (!productsData[index]) return;

      const productId = productsData[index].id;

      try {
        const responseImages = await api.get(`product/${productId}/image`);

        if (responseImages.data) {
          const newProductsData = [...productsData]; // create a new copy of the productsData array
          newProductsData[index] = {
            ...newProductsData[index],
            image: [responseImages.data], // update the image array of the corresponding product object
          };
          setProductsWImageData(newProductsData); // update the state with the new array of product objects
        }
      } catch (err) {
        console.log(err);
        if (err instanceof AxiosError) {
          setShowToast(true);
          setToastMessageType(IToastType.error);
          setToastMessage(`Error: ${err?.response?.data}`);
        }
      }

      await setPhoto(index + 1);
    };

    const updateData = async () => {
      await setPhoto(0);
      console.log(productsWImageData);
    };

    updateData();
  }, [productsData]);

  return (
    <Container>
      <HomeHeader />
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ReactLoading
            type={'cylon'}
            color={'#1b4332'}
            height={'150px'}
            width={'150px'}
          />
        </div>
      )}
      {!loading && (
        <Content>
          <Title>Produtos</Title>
          <Cards>
            {productsWImageData.length > 0 &&
              productsWImageData?.map((product) => {
                return (
                  <Card key={product.id}>
                    <ImageBox></ImageBox>
                    <TextBox>
                      <span>
                        <strong>{product.name}</strong>
                      </span>
                      <span>{product.description}</span>
                    </TextBox>
                    <FooterBox>
                      <span>
                        R$ <strong>{product.price}</strong>
                      </span>
                      <CartBox>
                        <MdShoppingCart color='white' />
                      </CartBox>
                    </FooterBox>
                  </Card>
                );
              })}
          </Cards>
        </Content>
      )}
    </Container>
  );
};
