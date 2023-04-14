import { Button, Card, Form } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect, useState } from 'react';
import { IAdditional } from '../../../../utils/Interface/Additional';
import { IProduct } from '../../../../utils/Interface/Product';
import { useForm } from 'react-hook-form';
import {
  AdditionalSchema,
  additionalSchema,
} from '../../../../validation/additionalValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastMessage } from '../../../../components/Toast';
import { IToastType } from '../../../../utils/Interface/Toast';
import { api } from '../../../../services/api';
import { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';

interface Props {
  productData: IProduct;
  setProductData: (productData: any) => void;
}

export const ProductAdditional = ({ productData, setProductData }: Props) => {
  const [additionalData, setAdditionalData] = useState<IAdditional>({
    name: '',
  });
  const [additionalsList, setAdditionalsList] = useState<IAdditional[]>([]);
  const [filteredResults, setFilteredResults] = useState<IAdditional[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessageType, setToastMessageType] = useState<IToastType>(
    IToastType.unknow
  );
  const [toastMessage, setToastMessage] = useState('');
  const { productId, companyId } = useParams();
  const [showFilteredResults, setShowFilteredResults] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
    trigger,
  } = useForm<AdditionalSchema>({
    resolver: yupResolver(additionalSchema),
    mode: 'onTouched',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`${companyId}/additionals`);

        if (response.data) {
          const responseFiltered = response.data.map((item: any) => ({
            id: item.id,
            name: item.name,
            price: item.price,
          }));

          setAdditionalsList(responseFiltered);
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

  const handleSearch = (name: string) => {
    setShowFilteredResults(false);
    setAdditionalData({ name });

    setTimeout(() => {
      trigger('name');
    }, 500);

    if (additionalData?.name) {
      const filteredAdditionals = additionalsList
        .filter((item) => {
          const itemName = item?.name?.toLocaleLowerCase()!;
          const inputName = additionalData?.name?.toLocaleLowerCase();
          if (itemName === inputName) return;
          return (
            inputName && itemName.includes(inputName) && itemName !== inputName
          );
        })
        .slice(0, 5);

      setFilteredResults(filteredAdditionals);
      setShowFilteredResults(true);
    } else {
      setFilteredResults([]);
      setShowFilteredResults(false);
    }
  };

  const handleRegister = async (data: any) => {
    const companyHasProduct = additionalsList?.find(
      (item) =>
        item.name?.toLocaleLowerCase() === data?.name?.toLocaleLowerCase()
    );

    if (
      productData?.additional?.find(
        (item) =>
          item.name?.toLocaleLowerCase() === data?.name?.toLocaleLowerCase()
      )
    ) {
    } else if (companyHasProduct) {
      try {
        const response = await api.post(
          `/product/${productId}/${companyHasProduct.id}`
        );

        if (response?.data?.product) {
          setProductData((state: any) => ({
            ...state,
            additional: [...state.additional, response.data.product.additional],
          }));

          setShowToast(true);
          setToastMessageType(IToastType.success);
          setToastMessage('Produto criado!');
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          setShowToast(true);
          setToastMessageType(IToastType.error);
          if (err?.response?.data === 'Product already exists.') {
            setToastMessage('Error: Produto já existe!');
          } else {
            setToastMessage(`Error: ${err?.response?.data}`);
          }
        }
      }
    } else {
      try {
        const response = await api.post(`${companyId}/additionals`, {
          name: data.name,
          price: data.price,
        });

        if (response?.data?.product) {
          const relatesAdditional = await api.post(
            `/product/${productId}/${response?.data.product.id}`
          );

          setProductData((state: any) => ({
            ...state,
            additional: [...state.additional, response.data.product.additional],
          }));

          setShowToast(true);
          setToastMessageType(IToastType.success);
          setToastMessage('Produto criado!');
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          setShowToast(true);
          setToastMessageType(IToastType.error);
          if (err?.response?.data === 'Product already exists.') {
            setToastMessage('Error: Produto já existe!');
          } else {
            setToastMessage(`Error: ${err?.response?.data}`);
          }
        }
      }
    }

    setFocus('name');

    reset((formValues) => ({
      ...formValues,
      name: '',
      price: 0,
    }));
  };

  return (
    <>
      <ToastMessage
        setShowToast={setShowToast}
        showToast={showToast}
        toastMessage={toastMessage}
        toastMessageType={toastMessageType}
      />
      <Form onSubmit={handleSubmit(handleRegister)}>
        <Form.Group className='mb-3'>
          <Form.Label>Adicional:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Nome'
            required
            {...register('name')}
            value={additionalData?.name}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <ListGroup
            style={{ display: showFilteredResults ? 'block' : 'none' }}
          >
            {filteredResults ? (
              filteredResults.map((item, idx) => {
                return (
                  <ListGroup.Item
                    key={idx}
                    onClick={() => handleSearch(item.name!)}
                  >
                    {item.name}
                  </ListGroup.Item>
                );
              })
            ) : (
              <ListGroup.Item></ListGroup.Item>
            )}
          </ListGroup>
          {errors.name && (
            <span style={{ color: 'red', marginTop: '0.5rem' }}>
              {errors.name?.message?.toString()}
            </span>
          )}
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Valor:</Form.Label>
          <Form.Control
            type='number'
            placeholder='Valor'
            required
            step='0.01'
            min='0'
            // value={additionalData?.price}
            {...register('price')}
          />
          {errors.price && (
            <span style={{ color: 'red', marginTop: '0.5rem' }}>
              {errors.price?.message?.toString()}
            </span>
          )}
        </Form.Group>
        <Form.Group className='mb-3'>
          <Button variant='primary' type='submit'>
            Adicionar
          </Button>
        </Form.Group>
      </Form>

      <Card className='text-center'>
        <Card.Body>
          <Card.Title>Lista de Adicionais</Card.Title>
          <ListGroup variant='flush'>
            {productData?.additional?.map((item, idx) => {
              return (
                <ListGroup.Item
                  key={idx}
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  {item.name}
                  <div>R${item.price}</div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  );
};
