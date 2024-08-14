import { Route } from 'react-router-dom';

import PrivateLayout from '../layouts/PrivateLayout';
import AddUserPage from '../pages/private/AddUserPage';
import ListUsersPage from '../pages/private/ListUsersPage';

const publicRoutes = (
  <>
    <Route key="private" element={<PrivateLayout />}>
      <Route path="/add_user" element={<AddUserPage />} />
      <Route path="/list_users" element={<ListUsersPage />} />
    </Route>
  </>
);

export default publicRoutes;