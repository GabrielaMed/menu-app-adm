import { AxiosError } from 'axios';
import {
  Container,
  Content,
  Navbar,
  OrderContainer,
  OrderFooter,
  OrderHeader,
} from './style';
import { IToastType } from '../../utils/Interface/Toast';
import { api } from '../../services/api';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading';
import {
  MdArrowBack,
  MdDeliveryDining,
  MdPerson,
  MdRestaurantMenu,
  MdSoupKitchen,
} from 'react-icons/md';
import { GlobalContext } from '../../shared/GlobalContext';
import { ToastMessage } from '../../components/Toast';
import { IOrder } from '../../utils/Interface/Order';
import { OrderStatus } from '../../utils/Enum/OrderStatus';

export const Orders = () => {
  const { companyId } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [ordersData, setOrdersData] = useState<IOrder[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessageType, setToastMessageType] = useState<IToastType>(
    IToastType.unknow
  );
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`order/${companyId}`);

        if (response.data) {
          setOrdersData(response.data);
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
  console.log('REESPONSE>>>>', ordersData);

  const formatDate = (dateTime: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    const date = new Date(dateTime);
    return date.toLocaleTimeString('pt-BR', options);
  };

  const getOrderStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.canceladoCliente:
        return <MdPerson color='red' />;
      case OrderStatus.iniciado:
        return <MdPerson color='orange' />;
      case OrderStatus.enviado:
        return <MdPerson color='green' />;

      case OrderStatus.em_producao:
        return <MdSoupKitchen color='orange' />;
      case OrderStatus.pronto:
        return <MdSoupKitchen color='green' />;

      case OrderStatus.emRota:
        return <MdDeliveryDining color='orange' />;
      case OrderStatus.entregue:
        return <MdDeliveryDining color='green' />;

      case OrderStatus.canceladoRestaurante:
        return <MdRestaurantMenu color='red' />;

      default:
        return null;
    }
  };

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
        {!loading && (
          <Content>
            {ordersData?.map((order, idx) => (
              <OrderContainer
                key={idx}
                onClick={() => navigate('/orderDetails')}
              >
                <OrderHeader>
                  <strong>N° Pedido: {order.orderNumber}</strong>

                  <strong>Mesa: {order.tableNumber}</strong>
                </OrderHeader>
                <span>Data: {formatDate(order.dateTimeOrder)} </span>
                <OrderFooter>
                  <span>
                    Total:{' '}
                    {Number(order.total).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </span>
                  <span>
                    Status: {order.statusOrder}{' '}
                    {getOrderStatusIcon(order.statusOrder)}
                  </span>
                </OrderFooter>
              </OrderContainer>
            ))}
          </Content>
        )}
      </Container>
    </>
  );
};
