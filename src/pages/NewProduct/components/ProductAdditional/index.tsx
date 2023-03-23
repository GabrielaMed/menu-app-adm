import { Button, Card, Form } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { FormEvent, useState } from 'react';
import { IAdditional } from '../../../../utils/Interface/Additional';
import { IProduct } from '../../../../utils/Interface/Product';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const additionalFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: 'Nome do adicional deve ter pelo menos 3 caracteres.' })
    .max(100, { message: 'Nome do produto deve ter no máximo 100 caracteres.' })
    .transform((name) => name.toLowerCase()),
  price: z
    .string()
    .nonempty({ message: 'Valor não pode ser nulo.' })
    .regex(/^\d+(\.\d{1,2})?$/, {
      message:
        'Valor deve ser um número finito e positivo, com no máximo duas casas decimais.',
    })
    .max(10, { message: 'Valor deve conter no máximo 10 números.' }),
});

type AdditionalFormSchema = z.infer<typeof additionalFormSchema>;

interface Props {
  productData: IProduct;
  setProductData: (productData: any) => void;
}

export const ProductAdditional = ({ productData, setProductData }: Props) => {
  const [additionalData, setAdditionalData] = useState<IAdditional>();
  const [additionalsList, setAdditionalsList] = useState<IAdditional[]>([]);
  const [filteredResults, setFilteredResults] = useState<IAdditional[]>([]);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<AdditionalFormSchema>({
    resolver: zodResolver(additionalFormSchema),
  });

  const handleSearch = (name: string) => {
    setAdditionalData((state) => ({
      ...state,
      name,
    }));

    if (additionalData?.name) {
      const filteredAdditionals = productData?.additional
        ?.filter((item) => {
          const itemName = item?.name?.toLocaleLowerCase()!;
          const inputName = additionalData?.name?.toLocaleLowerCase();
          if (itemName === inputName) return;
          return inputName && itemName.includes(inputName);
        })
        .slice(0, 5);

      setFilteredResults(filteredAdditionals!);
    }
  };

  const handleRegister = (data: AdditionalFormSchema) => {
    if (
      additionalsList?.find(
        (item) =>
          item.name?.toLocaleLowerCase() === data?.name?.toLocaleLowerCase()
      )
    )
      return;

    additionalsList.push({
      name: data?.name,
      price: data?.price,
    });

    setProductData((state: any) => ({
      ...state,
      additional: additionalsList,
    }));
  };

  return (
    <>
      <Form onSubmit={handleSubmit(handleRegister)}>
        <Form.Group className='mb-3'>
          <Form.Label>Adicional:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Nome'
            required
            value={additionalData?.name}
            {...register('name')}
          />
          {errors.name && (
            <label style={{ color: 'red', marginTop: '0.5rem' }}>
              {errors.name.message}
            </label>
          )}
          <ListGroup style={{ display: filteredResults ? 'block' : 'none' }}>
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
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Valor:</Form.Label>
          <Form.Control
            type='number'
            placeholder='Valor'
            required
            step='0.01'
            min='0.01'
            value={additionalData?.price}
            {...register('price')}
          />
          {errors.price && (
            <label style={{ color: 'red', marginTop: '0.5rem' }}>
              {errors.price.message}
            </label>
          )}
        </Form.Group>
        <Form.Group className='mb-3'>
          <Button variant='primary' type='submit' disabled={isSubmitting}>
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
