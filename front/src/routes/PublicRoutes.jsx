import { Route } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import LoginPage from '../pages/public/LoginPage';

import PrivateLayout from '../layouts/PrivateLayout';
import AddUserPage from '../pages/private/AddUserPage';

const publicRoutes = (
  <>
    <Route key="public" element={<PublicLayout />}>
      <Route path="/login" element={<LoginPage />} />
    </Route>
    <Route key="private" element={<PrivateLayout />}>
      <Route path="/add_user" element={<AddUserPage />} />
    </Route>
  </>
);

export default publicRoutes;