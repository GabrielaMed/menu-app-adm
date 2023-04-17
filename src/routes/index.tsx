import { Route, Routes } from 'react-router-dom';
import { NewProduct } from '../pages/NewProduct';
import { CompanyHome } from '../pages/CompanyHome';
import { ProductList } from '../pages/ProductList';
import { Home } from '../pages/Home';

export const AppRoutes = () => (
  <Routes>
    <Route path='/:companyId' element={<CompanyHome />} />
    <Route path='/:companyId/products' element={<ProductList />} />
    <Route path='/:companyId/product' element={<NewProduct />} />
    <Route path='/:companyId/product/:productId' element={<NewProduct />} />
    <Route path='/' element={<Home />} />
  </Routes>
);
