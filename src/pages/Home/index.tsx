import { useNavigate } from 'react-router-dom';
import {
  Card,
  Container,
  Content,
  FooterBox,
  ImageBox,
  TextBox,
} from './style';
import { Header } from '../../components/Header';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { IProduct } from '../../utils/Interface/Product';
import { IToastType } from '../../utils/Interface/Toast';
import { api } from '../../services/api';
import ReactLoading from 'react-loading';

export const Home = () => {
  const companyId = `${process.env.REACT_APP_COMPANY_ID}`;
  const [loading, setLoading] = useState(false);
  const [productsData, setProductsData] = useState<IProduct[]>([]);
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

  return (
    <Container>
      <Header pageName='Home' />
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
          {productsData?.map((product) => {
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
                </FooterBox>
              </Card>
            );
          })}
        </Content>
      )}
    </Container>
  );
};
