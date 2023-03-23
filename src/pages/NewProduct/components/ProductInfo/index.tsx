import { IProduct } from '../../../../utils/Interface/Product';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const productFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, { message: 'Nome do produto deve ter pelo menos 3 caracteres.' })
    .max(100, { message: 'Nome do produto deve ter no máximo 100 caracteres.' })
    .transform((name) => name.toLowerCase()),
  description: z
    .string()
    .trim()
    .min(3, {
      message: 'Descrição do produto deve ter pelo menos 3 caracteres.',
    })
    .max(500, {
      message: 'Descrição do produto deve ter no máximo 500 caracteres.',
    })
    .transform((description) => description.toLowerCase()),
  price: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, {
      message:
        'Valor deve ser um número finito e positivo, com no máximo duas casas decimais.',
    })
    .max(10, { message: 'Valor deve conter no máximo 10 números.' }),
});

type ProductFormSchema = z.infer<typeof productFormSchema>;

interface Props {
  productData: IProduct;
  setProductData: (productData: any) => void;
}

export const ProductInfo = ({ productData, setProductData }: Props) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<ProductFormSchema>({
    resolver: zodResolver(productFormSchema),
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

  async function handleRegister(data: ProductFormSchema) {
    setProductData((state: any) => ({
      ...state,
      title: data.title,
      description: data.description,
      price: data.price,
    }));
  }

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
          <label style={{ color: 'red', marginTop: '0.5rem' }}>
            {errors.title.message}
          </label>
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
          <label style={{ color: 'red', marginTop: '0.5rem' }}>
            {errors.description.message}
          </label>
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
          <label style={{ color: 'red', marginTop: '0.5rem' }}>
            {errors.price.message}
          </label>
        )}
      </Form.Group>

      <Button variant='primary' type='submit' disabled={isSubmitting}>
        Criar
      </Button>
    </Form>
  );
};
