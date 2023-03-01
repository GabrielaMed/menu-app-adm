import { useState } from 'react';
import { IProduct } from '../../../../utils/Interface/Product';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

export const ProductInfo = () => {
  const [data, setData] = useState<IProduct>();

  return (
    <Form>
      <Form.Group className='mb-3'>
        <Form.Label>Foto:</Form.Label>
        <Form.Control
          type='file'
          placeholder='Insira uma foto'
          accept='image/png, image/jpeg, image/jpg'
          required
        />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Título:</Form.Label>
        <Form.Control
          type='text'
          placeholder='Título'
          required
          value={data?.title}
          onChange={(e) =>
            setData((state) => ({ ...state, title: e.target.value }))
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
          value={data?.description}
          onChange={(e) =>
            setData((state) => ({ ...state, description: e.target.value }))
          }
        />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Valor:</Form.Label>
        <Form.Control
          type='number'
          placeholder='Valor'
          required
          value={data?.price}
          onChange={(e) => {
            setData((state) => ({ ...state, price: +e.target.value }));
          }}
        />
      </Form.Group>

      <Button variant='primary' type='submit'>
        Criar
      </Button>
    </Form>
  );
};
