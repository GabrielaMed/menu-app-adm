import { AxiosError } from 'axios';
import {
  Card,
  Container,
  Content,
  Footer,
  ImageBox,
  Navbar,
  Order,
  OrderInfo,
  OrderInfoAdditionals,
  OrderInfoButtonsBox,
  OrderInfoObservation,
  OrderDetail,
  ProductInfo,
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

export const OrderDetails = () => {
  const { orderDetailedId } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState<IOrder>();
  const [showToast, setShowToast] = useState(false);
  const [toastMessageType, setToastMessageType] = useState<IToastType>(
    IToastType.unknow
  );
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`order/${orderDetailedId}`);

        if (response.data) {
          setOrderData(response.data);
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

    if (orderDetailedId) {
      setLoading(true);
      fetchData();
    }
    // eslint-disable-next-line
  }, [orderDetailedId]);

  const formatDate = (dateTime: string | undefined) => {
    if (!dateTime) return;
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

  const getOrderStatusIcon = (status: OrderStatus | undefined) => {
    if (!status) return;
    switch (status) {
      case OrderStatus.canceladoCliente:
        return <MdPerson size={24} color='red' />;
      case OrderStatus.iniciado:
        return <MdPerson size={24} color='orange' />;
      case OrderStatus.enviado:
        return <MdPerson size={24} color='green' />;

      case OrderStatus.em_producao:
        return <MdSoupKitchen size={24} color='orange' />;
      case OrderStatus.pronto:
        return <MdSoupKitchen size={24} color='green' />;

      case OrderStatus.emRota:
        return <MdDeliveryDining size={24} color='orange' />;
      case OrderStatus.entregue:
        return <MdDeliveryDining size={24} color='green' />;

      case OrderStatus.canceladoRestaurante:
        return <MdRestaurantMenu size={24} color='red' />;

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
              onClick={() => navigate(`/orders`)}
            />
          </span>
          <span>Detalhes Pedido {orderData?.orderNumber}</span>
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
            {orderData?.Order_products
              ? orderData?.Order_products.map((order, idx) => (
                  <Card key={idx}>
                    <Order>
                      {order.product.Image ? (
                        <ImageBox>
                          <img
                            src={
                              process.env.REACT_APP_IMAGE_URL! +
                              order.product.Image[0].fileName
                            }
                            alt=''
                          />
                        </ImageBox>
                      ) : null}
                      <OrderInfo>
                        <ProductInfo>
                          {order.product.name}
                          <strong>
                            {Number(
                              (orderData?.Order_products[0].quantity ?? 0) *
                                (orderData?.Order_products[0].product.price ??
                                  0)
                            ).toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            })}
                          </strong>
                        </ProductInfo>
                        {(order.additionals?.length ?? 0) > 0 ? (
                          <OrderInfoAdditionals>
                            <strong>Adicionais: </strong>
                            {Array.isArray(order.additionals)
                              ? order.additionals.map((additional, idx) => (
                                  <span key={idx}>
                                    <span>
                                      {additional.quantity} - {additional.name}
                                    </span>
                                    <span>
                                      {Number(
                                        (additional.quantity ?? 0) *
                                          (additional.price ?? 0)
                                      ).toLocaleString('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                      })}
                                    </span>
                                  </span>
                                ))
                              : null}
                          </OrderInfoAdditionals>
                        ) : null}

                        {order.observation ? (
                          <OrderInfoObservation>
                            Observação: {order.observation}
                          </OrderInfoObservation>
                        ) : null}
                        <OrderInfoButtonsBox>
                          Quantidade: {order.quantity}
                        </OrderInfoButtonsBox>
                      </OrderInfo>
                    </Order>
                  </Card>
                ))
              : null}

            <Footer>
              <OrderDetail>
                <strong>Mesa: </strong>
                {orderData?.tableNumber}
              </OrderDetail>

              <OrderDetail>
                <strong>Total:</strong>

                <span>
                  {Number(orderData?.total).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </span>
              </OrderDetail>
              <OrderDetail>
                <span>
                  <strong>Status: </strong>
                </span>
                <span>
                  {orderData?.statusOrder}
                  {getOrderStatusIcon(orderData?.statusOrder)}
                </span>
              </OrderDetail>
              <OrderDetail>
                <strong>Data: </strong>
                {formatDate(orderData?.dateTimeOrder)}
              </OrderDetail>
            </Footer>
          </Content>
        )}
      </Container>
    </>
  );
};
