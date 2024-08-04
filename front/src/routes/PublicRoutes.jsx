import { Route } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import LoginPage from '../pages/public/LoginPage';

import AddUserPage from '../pages/private/AddUserPage';

const publicRoutes = (
  <Route key="public" element={<PublicLayout />}>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/add_user" element={<AddUserPage />} />
  </Route>
);

export default publicRoutes;