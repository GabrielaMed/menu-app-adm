import { useForm } from 'react-hook-form';
import { IProduct } from '../../../../utils/Interface/Product';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { ProductSchema } from '../../../../validation/productValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { api } from '../../../../services/api';
import { useContext, useEffect, useState } from 'react';
import { IToastType } from '../../../../utils/Interface/Toast';
import { ToastMessage } from '../../../../components/Toast';
import { AxiosError } from 'axios';
import { productImageRegistration } from '../../../../utils/productImageRegistration';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../../../shared/GlobalContext';
import ReactLoading from 'react-loading';
import { ImageUploadCarousel } from '../../../../components/ImageUploadCarousel';

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
  const { companyId, productId, setProductId } = useContext(GlobalContext);
  const [relateImage, setRelateImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (data: any) => {
    if (!productId) {
      try {
        setLoading(true);
        const response = await api.post(`${companyId}/product`, {
          name: data.name,
          description: data.description,
          price: data.price,
        });

        if (response?.data?.product) {
          setProductId(response?.data?.product?.id);
          setRelateImage(true);
          setLoading(false);

          setShowToast(true);
          setToastMessageType(IToastType.success);
          setToastMessage('Produto criado!');

          setProductId(response?.data?.product?.id);
          setTimeout(() => {
            navigate(`/product`);
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
        setLoading(true);
        const response = await api.put(`${companyId}/product/${productId}`, {
          name: data.name,
          description: data.description,
          price: data.price,
        });
        if (response?.data?.product) {
          setLoading(false);

          setShowToast(true);
          setToastMessageType(IToastType.success);
          setToastMessage('Produto atualizado!');

          setProductId(response?.data?.product?.id);
          setTimeout(() => {
            navigate(`/product`);
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
    }
  };

  useEffect(() => {
    const handleRelateImage = async () => {
      setLoading(true);
      const response: any = await productImageRegistration.handle(
        productId,
        productData.Image
      );
      setRelateImage(false);

      if (response?.data?.status === 'success' && response?.data?.fileName) {
        setProductData((state: IProduct) => ({
          ...state,
          name: response.data.product.name,
          Image: [
            {
              fileName: response.data.fileName,
              id: response.data.id,
            },
          ],
        }));
      }
    };

    if (productData && productId && relateImage === true) {
      handleRelateImage();
      setLoading(false);
    }
  }, [relateImage]);

  return (
    <>
      <ToastMessage
        setShowToast={setShowToast}
        showToast={showToast}
        toastMessage={toastMessage}
        toastMessageType={toastMessageType}
      />
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
        <Form onSubmit={handleSubmit(handleRegister)}>
          <ImageUploadCarousel
            productData={productData}
            setProductData={setProductData}
          />
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
      )}
    </>
  );
};
