import { Route } from 'react-router-dom';
import LoginPage from '../pages/public/LoginPage';
import PublicLayout from '../layouts/PublicLayout';


const publicRoutes = (
  <Route key="public" element={<PublicLayout />}>
    <Route path="/login" element={<LoginPage />} />
  </Route>
);

export default publicRoutes;