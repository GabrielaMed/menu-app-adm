import { AxiosError } from 'axios';
import {
  Container,
  Content,
  FiltersContainer,
  NavbarOrder,
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
import { Alert, Form } from 'react-bootstrap';

export const Orders = () => {
  const { companyId, setOrderDetailedId } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [ordersData, setOrdersData] = useState<IOrder[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<IOrder[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessageType, setToastMessageType] = useState<IToastType>(
    IToastType.unknow
  );
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();
  const [showAllOrders, setShowAllOrders] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`order/company/${companyId}`);

        if (response.data) {
          setOrdersData(response.data);
          setFilteredOrders(
            response.data.filter(
              (order: IOrder) => order.statusOrder === OrderStatus.pronto
            )
          );
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

  const handleFilterOrders = (showAll: boolean) => {
    if (showAll) {
      setFilteredOrders(ordersData);
    } else {
      setFilteredOrders(
        ordersData.filter((order) => order.statusOrder === OrderStatus.pronto)
      );
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
        <NavbarOrder>
          <span>
            <MdArrowBack
              size={24}
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/`)}
            />
          </span>
          <span>Pedidos</span>
        </NavbarOrder>
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
            <FiltersContainer>
              <strong>Filtros:</strong>
              <Form.Check
                type='radio'
                name='filter'
                id='showAll'
                label='Mostrar todos os pedidos'
                defaultChecked={showAllOrders}
                onChange={() => handleFilterOrders(true)}
              />
              <Form.Check
                type='radio'
                name='filter'
                id='showReady'
                label='Mostrar apenas pedidos prontos'
                defaultChecked={!showAllOrders}
                onChange={() => handleFilterOrders(false)}
              />
            </FiltersContainer>

            {filteredOrders.length > 0 ? (
              filteredOrders?.map((order, idx) => (
                <OrderContainer
                  key={idx}
                  onClick={() => {
                    setOrderDetailedId(order.id);
                    navigate('/orderDetails');
                  }}
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
              ))
            ) : (
              <div>Não há nenhum pedido pronto!</div>
            )}
          </Content>
        )}
      </Container>
    </>
  );
};
