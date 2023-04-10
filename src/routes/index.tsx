import { Route, Routes } from 'react-router-dom';
import { NewProduct } from '../pages/NewProduct';
import { CompanyHome } from '../pages/CompanyHome';
import { ProductList } from '../pages/ProductList';

export const AppRoutes = () => (
  <Routes>
    <Route path='/:companyId' element={<CompanyHome />} />
    <Route path='/:companyId/products' element={<ProductList />} />
    <Route path='product' element={<NewProduct />} />
    <Route path='product/:id' element={<NewProduct />} />
  </Routes>
);
