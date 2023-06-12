import { Carousel, Form } from 'react-bootstrap';
import { IProduct } from '../../utils/Interface/Product';
import { MdDelete } from 'react-icons/md';
import { api } from '../../services/api';
import { IToastType } from '../../utils/Interface/Toast';
import { ToastMessage } from '../Toast';
import { AxiosError } from 'axios';
import { productImageRegistration } from '../../utils/productImageRegistration';
import { ProductSchema } from '../../validation/productValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../shared/GlobalContext';

interface Props {
  productData: IProduct;
  setProductData: (productData: any) => void;
}

export const ImageUploadCarousel = ({ productData, setProductData }: Props) => {
  const { register } = useForm({
    resolver: yupResolver(ProductSchema),
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessageType, setToastMessageType] = useState<IToastType>(
    IToastType.unknow
  );
  const [toastMessage, setToastMessage] = useState('');
  const { productId } = useContext(GlobalContext);
  const [relateImage, setRelateImage] = useState(false);

  const uploadImages = (files: any) => {
    let formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i], files[i].name);
    }

    setProductData((state: any) => ({
      ...state,
      Image: formData.getAll('file'),
    }));

    if (productId) {
      setRelateImage(true);
    }
  };

  const deleteImage = async (imageId: string) => {
    try {
      const response = await api.delete(`image/${imageId}`);

      if (response.status === 200) {
        const updatedProductData = {
          ...productData,
          Image: productData?.Image?.filter((item) => item.id !== imageId),
        };

        setProductData(updatedProductData);

        setShowToast(true);
        setToastMessageType(IToastType.success);
        setToastMessage('Imagem removida com sucesso.');
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setShowToast(true);
        setToastMessageType(IToastType.error);
        setToastMessage(`Error: ${err?.response?.data}`);
      }
    }
  };

  useEffect(() => {
    const handleRelateImage = async () => {
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
    }
    // eslint-disable-next-line
  }, [relateImage]);

  return (
    <>
      <ToastMessage
        setShowToast={setShowToast}
        showToast={showToast}
        toastMessage={toastMessage}
        toastMessageType={toastMessageType}
      />
      <Form.Group className='mb-3'>
        <Form.Label>Foto:</Form.Label>
        <Form.Control
          type='file'
          placeholder='Insira uma foto'
          accept='image/png, image/jpeg, image/pjpeg'
          multiple
          required
          {...register('image')}
          onChange={(e) => uploadImages((e.target as HTMLInputElement).files!)}
        />
      </Form.Group>

      <Carousel style={{ background: 'black', marginBottom: '1rem' }}>
        {productData?.Image
          ? productData?.Image?.map((item, idx) => {
              return (
                <Carousel.Item key={idx}>
                  <img
                    className='d-block w-100'
                    style={{ objectFit: 'cover', height: '15rem' }}
                    src={
                      process.env.REACT_APP_IMAGE_URL + item?.fileName ||
                      item.fileName
                    }
                    alt={item.fileName}
                  />
                  <MdDelete
                    size={24}
                    className='delete-icon'
                    style={{ cursor: 'pointer' }}
                    onClick={() => deleteImage(item.id)}
                  />
                </Carousel.Item>
              );
            })
          : null}
      </Carousel>
    </>
  );
};
