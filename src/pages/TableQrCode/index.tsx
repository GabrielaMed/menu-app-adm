import { MdAdd, MdArrowBack } from 'react-icons/md';
import {
  ButtonAddTable,
  Card,
  Container,
  Content,
  Footer,
  Navbar,
} from './style';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import QRCode from 'react-qr-code';
import { Button, Form, Modal } from 'react-bootstrap';
import { IToastType } from '../../utils/Interface/Toast';
import { api } from '../../services/api';
import { GlobalContext } from '../../shared/GlobalContext';
import { AxiosError } from 'axios';
import { ToastMessage } from '../../components/Toast';
import { ITable } from '../../utils/Interface/Table';

export const TableQrCode = () => {
  const { companyId } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const linkUrl =
    'https://menu-app-gm.netlify.app/cf9b4387-cb93-4895-a83f-7c92ee4e1125/2';
  const [tableQuantity, setTableQuantity] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessageType, setToastMessageType] = useState<IToastType>(
    IToastType.unknow
  );
  const [toastMessage, setToastMessage] = useState('');
  const [tableData, setTableData] = useState<ITable[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const regex = /^\d*$/;

    if (regex.test(inputValue) || inputValue === '') {
      setTableQuantity(inputValue);
    }
  };

  const handleGenerateQrCode = async () => {
    try {
      setLoading(true);
      const response = await api.post(`/table`, { tableQuantity, companyId });

      if (response.data) {
        setTableData((state: ITable[]) => [...state, ...response.data.tables]);

        setLoading(false);
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
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`${companyId}/tables`);

        if (response.data) {
          setTableData(response.data.tables);
          setLoading(false);
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          setShowToast(true);
          setToastMessageType(IToastType.error);
          setToastMessage(`Error: ${err?.response?.data}`);
        }
      }
    };

    if (companyId) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [!tableData]);

  return (
    <>
      <ToastMessage
        setShowToast={setShowToast}
        showToast={showToast}
        toastMessage={toastMessage}
        toastMessageType={toastMessageType}
      />
      <Container>
        <Navbar>
          <span>
            <MdArrowBack
              size={24}
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/`)}
            />
          </span>
          <span>Mesas</span>
        </Navbar>
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ReactLoading
              type={'cylon'}
              color={'#4B2995'}
              height={'150px'}
              width={'150px'}
            />
          </div>
        )}
        {!loading && (
          <Content>
            {tableData.length > 0
              ? tableData.map((data, idx) => (
                  <Card key={idx}>
                    <span>Mesa {data.tableNumber}</span>
                    <QRCode value={data.tableLink} size={256} />
                  </Card>
                ))
              : null}

            <Footer>
              <ButtonAddTable>
                <MdAdd color='white' size={24} onClick={() => setShow(true)} />
              </ButtonAddTable>
            </Footer>
          </Content>
        )}
      </Container>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Criar mesa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>Quantidade de mesas: </Form.Label>
              <Form.Control
                type='number'
                step='1'
                placeholder='0'
                value={tableQuantity}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='primary'
            onClick={() => {
              handleGenerateQrCode();
              setShow(false);
            }}
          >
            Criar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
