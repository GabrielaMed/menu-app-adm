import { Route, Routes } from 'react-router-dom';
import { NewProduct } from '../pages/NewProduct';

export const AppRoutes = () => (
  <Routes>
    <Route path='product' element={<NewProduct />} />
    <Route path='product/:id' element={<NewProduct />} />
  </Routes>
);
