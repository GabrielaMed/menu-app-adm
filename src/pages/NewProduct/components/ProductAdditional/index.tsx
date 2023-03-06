import { Button, Card, Form } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState } from 'react';
import { IAdditional } from '../../../../utils/Interface/Additional';
import { IProduct } from '../../../../utils/Interface/Product';

interface Props {
  productData: IProduct;
  setProductData: (productData: any) => void;
}

export const ProductAdditional = ({ productData, setProductData }: Props) => {
  const [additionalData, setAdditionalData] = useState<IAdditional>();
  const [filteredResults, setFilteredResults] = useState<IAdditional[]>([]);

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

  const handleSubmit = () => {
    if (!additionalData?.name || !additionalData.price) return;
    if (
      productData?.additional?.find(
        (item) =>
          item.name?.toLocaleLowerCase() ===
          additionalData?.name?.toLocaleLowerCase()
      )
    )
      return;

    setProductData((state: any) => [
      {
        ...state,
        additional: [
          {
            name: additionalData?.name,
            price: additionalData?.price,
          },
        ],
      },
    ]);
  };

  return (
    <>
      <Form>
        <Form.Group className='mb-3'>
          <Form.Label>Adicional:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Nome'
            required
            value={additionalData?.name}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <ListGroup
            style={{ display: additionalData?.name ? 'block' : 'none' }}
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
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Valor:</Form.Label>
          <Form.Control
            type='number'
            placeholder='Valor'
            required
            value={additionalData?.price}
            step='0.01'
            min='0.01'
            onChange={(e) => {
              setAdditionalData((state) => ({
                ...state,
                price: +e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Button
            variant='primary'
            type='submit'
            onClick={handleSubmit}
            formAction='#'
          >
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
