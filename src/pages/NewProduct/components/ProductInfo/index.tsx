import { useForm } from 'react-hook-form';
import { IProduct } from '../../../../utils/Interface/Product';
import { Carousel, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { ProductSchema } from '../../../../validation/productValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { api } from '../../../../services/api';
import { useContext, useState } from 'react';
import { IToastType } from '../../../../utils/Interface/Toast';
import { ToastMessage } from '../../../../components/Toast';
import { AxiosError } from 'axios';
import { productImageRegistration } from '../../../../utils/productImageRegistration';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../../../shared/GlobalContext';

interface Props {
  productData: IProduct;
  setProductData: (productData: any) => void;
}

export const ProductInfo = ({ productData, setProductData }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(ProductSchema),
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessageType, setToastMessageType] = useState<IToastType>(
    IToastType.unknow
  );
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();
  const { companyId, productId } = useContext(GlobalContext);

  const uploadImages = (files: any) => {
    let formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i], files[i].name);
    }

    setProductData((state: any) => ({
      ...state,
      image: formData.getAll('file'),
    }));
  };

  async function handleRegister(data: any) {
    if (!productId) {
      try {
        const response = await api.post(`${companyId}/product`, {
          name: data.name,
          description: data.description,
          price: data.price,
        });

        if (response?.data?.product) {
          await productImageRegistration.handle(
            response?.data?.product?.id,
            productData.Image
          );

          setShowToast(true);
          setToastMessageType(IToastType.success);
          setToastMessage('Produto criado!');

          setTimeout(() => {
            navigate(`/${companyId}/product/${response?.data?.product?.id}`);
          }, 5000);
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

      reset((formValues) => ({
        ...formValues,
        name: '',
        description: '',
        price: 0,
      }));
    } else {
      try {
        const response = await api.put(`${companyId}/product/${productId}`, {
          name: data.name,
          description: data.description,
          price: data.price,
        });

        if (response?.data?.product) {
          await productImageRegistration.handle(
            response?.data?.product?.id,
            productData.Image
          );

          setShowToast(true);
          setToastMessageType(IToastType.success);
          setToastMessage('Produto atualizado!');
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
  }

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
          <Form.Label>Foto:</Form.Label>
          <Form.Control
            type='file'
            placeholder='Insira uma foto'
            accept='image/png, image/jpeg, image/pjpeg'
            multiple
            required
            {...register('image')}
            onChange={(e) =>
              uploadImages((e.target as HTMLInputElement).files!)
            }
          />
        </Form.Group>

        <Carousel style={{ background: 'black', marginBottom: '1rem' }}>
          {productData?.Image?.map((item, idx) => {
            return (
              <Carousel.Item key={idx}>
                <img
                  className='d-block w-100'
                  style={{ objectFit: 'cover', height: '15rem' }}
                  src={process.env.REACT_APP_IMAGE_URL + item?.fileName}
                  alt=''
                />
              </Carousel.Item>
            );
          })}
        </Carousel>

        <Form.Group className='mb-3'>
          <Form.Label>Nome:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Nome do produto'
            required
            defaultValue={productData?.name}
            {...register('name')}
          />
          {errors.name && (
            <span style={{ color: 'red', marginTop: '0.5rem' }}>
              {errors.name?.message?.toString()}
            </span>
          )}
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Descrição:</Form.Label>
          <Form.Control
            as='textarea'
            style={{ resize: 'none' }}
            rows={3}
            placeholder='Descrição'
            required
            defaultValue={productData?.description}
            {...register('description')}
          />
          {errors.description && (
            <span style={{ color: 'red', marginTop: '0.5rem' }}>
              {errors?.description?.message?.toString()}
            </span>
          )}
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Valor:</Form.Label>
          <Form.Control
            type='number'
            placeholder='Valor'
            step='0.01'
            min='0'
            required
            defaultValue={productData?.price}
            {...register('price')}
          />
          {errors.price && (
            <span style={{ color: 'red', marginTop: '0.5rem' }}>
              {errors?.price?.message?.toString()}
            </span>
          )}
        </Form.Group>

        <Button
          style={{
            backgroundColor: '#4B2995',
            border: '1px  solid transparent',
          }}
          type='submit'
          disabled={isSubmitting}
        >
          {productId ? 'Salvar' : 'Criar'}
        </Button>
      </Form>
    </>
  );
};
