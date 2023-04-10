import { AxiosError } from 'axios';
import { Header } from '../../components/Header';
import { Card, Container, Content } from './style';
import { IToastType } from '../../utils/Interface/Toast';
import { api } from '../../services/api';
import { useEffect, useState } from 'react';
import { ICompany } from '../../utils/Interface/Company';
import { useNavigate, useParams } from 'react-router-dom';
import { MdOutlineFastfood, MdOutlineReceipt } from 'react-icons/md';
import { ProductList } from '../ProductList';

export const CompanyHome = () => {
  const { companyId } = useParams();
  const [companyData, setCompanyData] = useState<ICompany>();
  const [showToast, setShowToast] = useState(false);
  const [toastMessageType, setToastMessageType] = useState<IToastType>(
    IToastType.unknow
  );
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();

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
      <Content>
        <Card>
          <MdOutlineFastfood
            size={24}
            onClick={() => navigate(`/${companyId}/products`)}
          />
        </Card>
        <Card>
          <MdOutlineReceipt size={24} />
        </Card>
      </Content>
    </Container>
  );
};
