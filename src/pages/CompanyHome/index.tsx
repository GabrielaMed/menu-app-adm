import { AxiosError } from 'axios';
import { Header } from '../../components/Header';
import { Card, Container, Content } from './style';
import { IToastType } from '../../utils/Interface/Toast';
import { api } from '../../services/api';
import { useContext, useEffect, useState } from 'react';
import { ICompany } from '../../utils/Interface/Company';
import { useNavigate, useParams } from 'react-router-dom';
import { MdOutlineFastfood, MdOutlineReceipt } from 'react-icons/md';
import { GlobalContext } from '../../shared/GlobalContext';
import ReactLoading from 'react-loading';

export const CompanyHome = () => {
  const { companyIdURL } = useParams();
  const [companyData, setCompanyData] = useState<ICompany>();
  const [showToast, setShowToast] = useState(false);
  const [toastMessageType, setToastMessageType] = useState<IToastType>(
    IToastType.unknow
  );
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();
  const { setCompanyId, companyId } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (companyIdURL) {
      setCompanyId(companyIdURL ?? '');
      navigate('/');
    }
  }, [companyIdURL]);

  useEffect(() => {
    if (companyId) {
      setLoading(false);
    }
  }, [companyId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`company/${companyId}`);
        if (response.data) {
          setCompanyData(response.data.company);
        }
      } catch (err) {
        console.log(err);
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
  }, [companyId]);

  return (
    <Container>
      <Header pageName='Home' />
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
          <Card>
            <MdOutlineFastfood
              size={24}
              color='white'
              onClick={() => navigate(`/products`)}
            />
          </Card>
          <Card>
            <MdOutlineReceipt
              size={24}
              color='white'
              onClick={() => navigate(`/orders`)}
            />
          </Card>
        </Content>
      )}
    </Container>
  );
};
