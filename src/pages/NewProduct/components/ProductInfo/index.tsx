import { useForm } from 'react-hook-form';
import { IProduct } from '../../../../utils/Interface/Product';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { productSchema } from '../../../../validation/productValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { api } from '../../../../services/api';

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
    resolver: yupResolver(productSchema),
  });

  const uploadImages = (files: any) => {
    console.log(files, 'files');
    let formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i], files[i].name);
    }

    //formData.forEach((file) => console.log('File: ', file));

    setProductData((state: any) => ({
      ...state,
      image: formData.getAll('file'),
    }));

    // return formData.getAll('file');
  };

  async function handleRegister(data: any) {
    // console.log(data, 'data');
    // console.log(productData, 'po');

    const companyId = process.env.REACT_APP_COMPANY_ID;
    const response = await api.post(`${companyId}/product`, {
      name: data.name,
      description: data.description,
      price: data.price,
    });

    console.log('res', response);

    reset((formValues) => ({
      ...formValues,
      name: '',
      description: '',
      price: 0,
    }));
  }

  return (
    <Form onSubmit={handleSubmit(handleRegister)}>
      <Form.Group className='mb-3'>
        <Form.Label>Foto:</Form.Label>
        <Form.Control
          type='file'
          placeholder='Insira uma foto'
          // name='image'
          accept='image/png, image/jpeg, image/pjpeg'
          multiple
          // onChange={(e) => console.log((e.target as HTMLInputElement).files!)}
          required
          {...register('image')}
          onChange={(e) => uploadImages((e.target as HTMLInputElement).files!)}
        />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Nome:</Form.Label>
        <Form.Control
          type='text'
          placeholder='Nome do produto'
          required
          value={productData?.name}
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

      <Button variant='primary' type='submit' disabled={isSubmitting}>
        Criar
      </Button>
    </Form>
  );
};
