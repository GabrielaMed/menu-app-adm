import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './routes';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <Router>
    <AppRoutes />
  </Router>
);

export default App;
