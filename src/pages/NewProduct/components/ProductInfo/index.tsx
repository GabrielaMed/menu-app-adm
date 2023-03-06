import { useState } from 'react';
import { IProduct } from '../../../../utils/Interface/Product';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

interface Props {
  productData: IProduct;
  setProductData: (productData: any) => void;
}

export const ProductInfo = ({ productData, setProductData }: Props) => {
  const uploadImages = (files: FileList) => {
    let formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i], files[i].name);
    }

    //formData.forEach((file) => console.log('File: ', file));

    setProductData((state: any) => ({
      ...state,
      image: [formData.getAll('file')],
    }));
  };

  return (
    <Form>
      <Form.Group className='mb-3'>
        <Form.Label>Foto:</Form.Label>
        <Form.Control
          type='file'
          placeholder='Insira uma foto'
          accept='image/png, image/jpeg, image/jpg'
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
          onChange={(e) =>
            setProductData((state: any) => ({
              ...state,
              title: e.target.value,
            }))
          }
        />
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
          onChange={(e) =>
            setProductData((state: any) => ({
              ...state,
              description: e.target.value,
            }))
          }
        />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Valor:</Form.Label>
        <Form.Control
          type='number'
          placeholder='Valor'
          step='0.01'
          min='0.01'
          required
          value={productData?.price}
          onChange={(e) => {
            setProductData((state: any) => ({
              ...state,
              price: +e.target.value,
            }));
          }}
        />
      </Form.Group>

      <Button variant='primary' type='submit'>
        Criar
      </Button>
    </Form>
  );
};
