import { Button, Card, Form } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState } from 'react';
import { IAdditional } from '../../../../utils/Interface/Additional';

export const ProductAdditional = () => {
  const [additional, setAdditional] = useState<IAdditional>();
  const [filteredResults, setFilteredResults] = useState<IAdditional[]>([]);
  const [additionals, setAdditionals] = useState<IAdditional[]>([
    {
      name: 'Pão',
      price: 2,
    },
    {
      name: 'Bacon',
      price: 5,
    },
  ]);

  const handleSearch = (name: string) => {
    setAdditional((state) => ({
      ...state,
      name,
    }));

    if (additional?.name !== '') {
      const filteredAdditionals = additionals
        .filter((item) => {
          const itemName = item?.name?.toLocaleLowerCase()!;
          const inputName = additional?.name?.toLocaleLowerCase();
          if (itemName === inputName) return;
          return inputName && itemName.includes(inputName);
        })
        .slice(0, 5);

      setFilteredResults(filteredAdditionals);
    }
  };

  const handleSubmit = () => {
    setAdditionals((state) => ({
      ...state,
      additional,
    }));
  };

  return (
    <>
      <Form>
        <Form.Group className='mb-3'>
          <Form.Label>Adicional:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Adicional'
            required
            value={!additional?.name ? '' : additional.name}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <ListGroup>
            {filteredResults.map((item, idx) => {
              return (
                <ListGroup.Item
                  key={idx}
                  onClick={() =>
                    setAdditional((state) => ({
                      ...state,
                      name: item.name,
                    }))
                  }
                >
                  {item.name}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Valor:</Form.Label>
          <Form.Control
            type='number'
            placeholder='Valor'
            required
            onChange={(e) => {
              setAdditional((state) => ({ ...state, price: +e.target.value }));
            }}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Button variant='primary' type='submit' onClick={handleSubmit}>
            Adicionar
          </Button>
        </Form.Group>
      </Form>

      <Card>
        <Card.Body>
          <ListGroup variant='flush'>
            {additionals.map((item, idx) => {
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
