import { useForm } from 'react-hook-form';
import { IProduct } from '../../../../utils/Interface/Product';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { productSchema } from '../../../../validation/productValidation';
import { yupResolver } from '@hookform/resolvers/yup';

interface Props {
  productData: IProduct;
  setProductData: (productData: any) => void;
}

export const ProductInfo = ({ productData, setProductData }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(productSchema),
  });

  const uploadImages = (files: FileList) => {
    let formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i], files[i].name);
    }

    //formData.forEach((file) => console.log('File: ', file));

    setProductData((state: any) => ({
      ...state,
      image: formData.getAll('file'),
    }));
  };

  async function handleRegister(data: any) {}

  return (
    <Form onSubmit={handleSubmit(handleRegister)}>
      <Form.Group className='mb-3'>
        <Form.Label>Foto:</Form.Label>
        <Form.Control
          type='file'
          placeholder='Insira uma foto'
          accept='image/png, image/jpeg, image/pjpeg'
          multiple
          onChange={(e) => uploadImages((e.target as HTMLInputElement).files!)}
          required
        />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Título:</Form.Label>
        <Form.Control
          type='text'
          placeholder='Título'
          required
          value={productData?.title}
          {...register('title')}
        />
        {errors.title && (
          <span style={{ color: 'red', marginTop: '0.5rem' }}>
            {errors.title?.message?.toString()}
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
          value={productData?.description}
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
          value={productData?.price}
          {...register('price')}
        />
        {errors.price && (
          <span style={{ color: 'red', marginTop: '0.5rem' }}>
            {errors?.price?.message?.toString()}
          </span>
        )}
      </Form.Group>

      <Button
        variant='primary'
        type='submit'
        onClick={() => {
          reset((formValues) => ({
            ...formValues,
            title: '',
            description: '',
            price: 0,
          }));
        }}
      >
        Criar
      </Button>
    </Form>
  );
};
