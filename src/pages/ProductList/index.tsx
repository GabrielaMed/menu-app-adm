import { AxiosError } from 'axios';
import { Header } from '../../components/Header';
import {
  Card,
  Cards,
  Container,
  Content,
  DescriptionBox,
  FooterBox,
  ImageBox,
  TextBox,
} from './style';
import { IToastType } from '../../utils/Interface/Toast';
import { api } from '../../services/api';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { IProduct } from '../../utils/Interface/Product';
import { MdModeEdit } from 'react-icons/md';

export const ProductList = () => {
  const { companyId } = useParams();
  const [loading, setLoading] = useState(false);
  const [productsData, setProductsData] = useState<IProduct[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessageType, setToastMessageType] = useState<IToastType>(
    IToastType.unknow
  );
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();
  const [productsWImageData, setProductsWImageData] = useState<IProduct[]>([]);

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
    const updateData = async () => {
      const productsWithImages = [];

      for (let i = 0; i < productsData.length; i++) {
        const product = productsData[i];
        const productId = product.id;

        try {
          const responseImages = await api.get(`product/${productId}/image`);
          if (responseImages.data) {
            product.image = responseImages.data;
          }
        } catch (err) {
          console.log(err);
          if (err instanceof AxiosError) {
            setShowToast(true);
            setToastMessageType(IToastType.error);
            setToastMessage(`Error: ${err?.response?.data}`);
          }
        }

        productsWithImages.push(product);
      }

      setProductsWImageData(productsWithImages);
    };

    updateData();
  }, [productsData]);

  return (
    <Container>
      <Header pageName='Products' />
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
          <Cards>
            {productsWImageData.length > 0 &&
              productsWImageData?.map((product) => (
                <Card key={product.id}>
                  {product?.image ? (
                    <ImageBox>
                      <img
                        className='d-block w-100'
                        style={{ objectFit: 'contain', height: '15rem' }}
                        src={
                          process.env.REACT_APP_IMAGE_URL +
                          product?.image[0]?.fileName
                        }
                        alt=''
                      />
                    </ImageBox>
                  ) : (
                    <ImageBox></ImageBox>
                  )}

                  <TextBox>
                    <span>
                      <strong>{product.name}</strong>
                    </span>
                    <DescriptionBox>{product.description}</DescriptionBox>
                  </TextBox>
                  <FooterBox>
                    <span>
                      R$ <strong>{product.price}</strong>
                    </span>
                    <MdModeEdit
                      size={24}
                      onClick={() =>
                        navigate(`/${companyId}/product/${product.id}`)
                      }
                    />
                  </FooterBox>
                </Card>
              ))}
          </Cards>
        </Content>
      )}
    </Container>
  );
};
