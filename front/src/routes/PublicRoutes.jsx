import { Route } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import LoginPage from '../pages/public/LoginPage';

const PublicRoutes = (
  <>
    <Route key="public" element={<PublicLayout />}>
      <Route path="/login" element={<LoginPage />} />
    </Route>
  </>
);

export default PublicRoutes;