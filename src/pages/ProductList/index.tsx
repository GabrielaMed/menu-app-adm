import { AxiosError } from 'axios';
import {
  ButtonAddOrder,
  Card,
  Cards,
  Container,
  Content,
  DescriptionBox,
  FooterBox,
  ImageBox,
  Navbar,
  SearchBar,
  TextBox,
} from './style';
import { IToastType } from '../../utils/Interface/Toast';
import { api } from '../../services/api';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { IProduct } from '../../utils/Interface/Product';
import { MdAdd, MdArrowBack, MdModeEdit } from 'react-icons/md';
import { GlobalContext } from '../../shared/GlobalContext';
import { ToastMessage } from '../../components/Toast';

export const ProductList = () => {
  const { companyId, setProductId } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [productsData, setProductsData] = useState<IProduct[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessageType, setToastMessageType] = useState<IToastType>(
    IToastType.unknow
  );
  const [toastMessage, setToastMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`${companyId}/product`);

        if (response.data) {
          setProductsData(response.data);
          setLoading(false);
        }
      } catch (err) {
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
    // eslint-disable-next-line
  }, [companyId]);

  const filteredProducts = productsData.filter((product) =>
    product?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <ToastMessage
        setShowToast={setShowToast}
        showToast={showToast}
        toastMessage={toastMessage}
        toastMessageType={toastMessageType}
      />
      <Container>
        <Navbar>
          <span>
            <MdArrowBack
              size={24}
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/`)}
            />
          </span>
          <span>Produtos</span>
        </Navbar>
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ReactLoading
              type={'cylon'}
              color={'#4B2995'}
              height={'150px'}
              width={'150px'}
            />
          </div>
        )}
        {!loading && (
          <Content>
            <SearchBar
              type='text'
              placeholder='Pesquisar produto...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Cards>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Card
                    key={product.id}
                    onClick={() => {
                      setProductId(String(product.id));
                      navigate(`/product`);
                    }}
                  >
                    {product?.Image ? (
                      <ImageBox>
                        <img
                          className='d-block w-100'
                          style={{ objectFit: 'contain', height: '15rem' }}
                          src={
                            process.env.REACT_APP_IMAGE_URL +
                            product?.Image[0]?.fileName
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
                        <strong>
                          {Number(product.price).toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </strong>
                      </span>
                      <MdModeEdit size={24} />
                    </FooterBox>
                  </Card>
                ))
              ) : (
                <div>Nenhum produto encontrado.</div>
              )}
            </Cards>
          </Content>
        )}
        <ButtonAddOrder
          onClick={() => {
            setProductId('');
            navigate(`/product`);
          }}
        >
          <MdAdd color='white' size={24} />
        </ButtonAddOrder>
      </Container>
    </>
  );
};
