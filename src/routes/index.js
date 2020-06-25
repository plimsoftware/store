import React from 'react';
import { Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Login from '../pages/Login';
import Products from '../pages/Products';
import Fotos from '../pages/Fotos';
import Register from '../pages/Register';
import Checkout from '../pages/Checkout';
import Page404 from '../pages/Page404';
import Profile from '../pages/Profile';
import ChangePass from '../pages/ChangePass';
import ValidateMail from '../pages/ValidateMail';
import RecoverPass from '../pages/RecoverPass';
import DeleteAccount from '../pages/DeleteAccount';
import Orders from '../pages/Orders';
import AdminConsole from '../pages/admin/AdminConsole';
import CategoryAdmin from '../pages/admin/Category';
import ProductAdmin from '../pages/admin/Product';
import ProdEdit from '../pages/admin/ProdEdit';
import Stock from '../pages/admin/Stock';

export default function Routes() {
  return (
    <Switch>
      <PrivateRoute
        exact
        path="/"
        component={Products}
        isClosed={false}
        isAdmin={false}
      />
      <PrivateRoute
        exact
        path="/fotos/:id"
        component={Fotos}
        isClosed
        isAdmin={false}
      />
      <PrivateRoute
        exact
        path="/adminconsole"
        component={AdminConsole}
        isClosed
        isAdmin
      />
      <PrivateRoute
        exact
        path="/categoryAdmin"
        component={CategoryAdmin}
        isClosed
        isAdmin
      />
      <PrivateRoute
        exact
        path="/productAdmin"
        component={ProductAdmin}
        isClosed
        isAdmin
      />
      <PrivateRoute exact path="/stock" component={Stock} isClosed isAdmin />
      <PrivateRoute
        exact
        path="/productAdmin/product"
        component={ProdEdit}
        isClosed
        isAdmin
      />
      <PrivateRoute
        exact
        path="/checkout/"
        component={Checkout}
        isClosed
        isAdmin={false}
      />
      <PrivateRoute
        exact
        path="/admin/"
        component={Login}
        isClosed={false}
        isAdmin={false}
      />
      <PrivateRoute
        exact
        path="/deleteaccount/"
        component={DeleteAccount}
        isClosed
        isAdmin={false}
      />
      <PrivateRoute
        exact
        path="/orders/"
        component={Orders}
        isClosed
        isAdmin={false}
      />
      <PrivateRoute
        exact
        path="/login/:tipo"
        component={Login}
        isClosed={false}
        isAdmin={false}
      />
      <PrivateRoute
        exact
        path="/checkmail/"
        component={ValidateMail}
        isClosed={false}
        isAdmin={false}
      />
      <PrivateRoute
        exact
        path="/register/"
        component={Register}
        isClosed={false}
        isAdmin={false}
      />
      <PrivateRoute
        exact
        path="/changepassword/"
        component={ChangePass}
        isClosed
        isAdmin={false}
      />
      <PrivateRoute
        exact
        path="/recoverpassword/"
        component={RecoverPass}
        isClosed={false}
        isAdmin={false}
      />
      <PrivateRoute
        exact
        path="/profile/"
        component={Profile}
        isClosed
        isAdmin={false}
      />
      <PrivateRoute path="*" component={Page404} />
    </Switch>
  );
}
