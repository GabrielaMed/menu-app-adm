import { Form } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState } from 'react';
import { IAdditional } from '../../../../utils/Interface/Additional';

export const ProductAdditional = () => {
  const [additional, setAdditional] = useState('');
  const [additionals, setAdditionals] = useState<IAdditional[]>([]);

  const handleAdditionals = () => {
    setAdditionals((ad) => ({ ...ad, additional }));
  };

  return (
    <>
      <Form>
        <Form.Select aria-label='Default select example'>
          <option>Open this select menu</option>
          {additionals.map((item, idx) => {
            return (
              <option key={idx} value={item.name}>
                {item.name}
              </option>
            );
          })}
        </Form.Select>
        <Form.Group className='mb-3'>
          <Form.Label>Valor:</Form.Label>
          <Form.Control
            type='number'
            placeholder='Valor'
            required
            onChange={(e) => {
              setAdditionals((state) => ({ ...state, price: +e.target.value }));
            }}
          />
        </Form.Group>
      </Form>

      <ListGroup variant='flush'>
        {additionals.map((item, idx) => {
          return (
            <ListGroup.Item
              key={idx}
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              {item.name}
              <div>{item.price}</div>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </>
  );
};
