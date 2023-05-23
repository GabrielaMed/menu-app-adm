import { useContext, useEffect, useState } from 'react';
import { ChosenTab, Container, Content, Navbar, Tab } from './style';
import { ProductInfo } from './components/ProductInfo';
import { ProductAdditional } from './components/ProductAdditional';
import { IProduct } from '../../utils/Interface/Product';
import { api } from '../../services/api';
import { IToastType } from '../../utils/Interface/Toast';
import { AxiosError } from 'axios';
import { GlobalContext } from '../../shared/GlobalContext';
import { MdArrowBack } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { ToastMessage } from '../../components/Toast';

export const NewProduct = () => {
  const [chosenTab, setchosenTab] = useState('Products');
  const [productData, setProductData] = useState<IProduct>({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessageType, setToastMessageType] = useState<IToastType>(
    IToastType.unknow
  );
  const [toastMessage, setToastMessage] = useState('');
  const { productId } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`product/${productId}`);

        if (response.data) {
          const { id, name, description, price, Additional_in_Product, Image } =
            response.data[0];
          const additional = Additional_in_Product.map((item: any) => ({
            ...item.additional,
            quantity: 0,
          }));

          setProductData({ id, name, description, price, Image, additional });
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
              onClick={() => navigate(`/products`)}
            />
          </span>
          <span>Produtos</span>
        </Navbar>
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
    </>
  );
};
