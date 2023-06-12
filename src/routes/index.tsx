import { Route, Routes } from 'react-router-dom';
import { NewProduct } from '../pages/NewProduct';
import { CompanyHome } from '../pages/CompanyHome';
import { ProductList } from '../pages/ProductList';
import { Orders } from '../pages/Orders';
import { OrderDetails } from '../pages/OrderDetails';

export const AppRoutes = () => (
  <Routes>
    <Route path='/:companyIdURL' element={<CompanyHome />} />
    <Route path='/' element={<CompanyHome />} />
    <Route path='/products' element={<ProductList />} />
    <Route path='/product' element={<NewProduct />} />
    <Route path='/orders' element={<Orders />} />
    <Route path='/orderDetails' element={<OrderDetails />} />
  </Routes>
);
