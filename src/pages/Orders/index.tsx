import { AxiosError } from 'axios';
import { Container, Content, Navbar } from './style';
import { IToastType } from '../../utils/Interface/Toast';
import { api } from '../../services/api';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { IProduct } from '../../utils/Interface/Product';
import { MdArrowBack } from 'react-icons/md';
import { GlobalContext } from '../../shared/GlobalContext';
import { ToastMessage } from '../../components/Toast';

export const Orders = () => {
  const { companyId } = useContext(GlobalContext);
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
          <span>Pedidos</span>
        </Navbar>
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
        {!loading && <Content></Content>}
      </Container>
    </>
  );
};
