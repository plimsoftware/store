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

export default function Routes() {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Products} isClosed={false} />
      <PrivateRoute exact path="/fotos/:id" component={Fotos} isClosed />
      <PrivateRoute exact path="/checkout/" component={Checkout} isClosed />
      <PrivateRoute exact path="/admin/" component={Login} isClosed={false} />
      <PrivateRoute
        exact
        path="/deleteaccount/"
        component={DeleteAccount}
        isClosed
      />
      <PrivateRoute exact path="/orders/" component={Orders} isClosed />
      <PrivateRoute
        exact
        path="/login/:tipo"
        component={Login}
        isClosed={false}
      />
      <PrivateRoute
        exact
        path="/checkmail/"
        component={ValidateMail}
        isClosed={false}
      />
      <PrivateRoute
        exact
        path="/register/"
        component={Register}
        isClosed={false}
      />
      <PrivateRoute
        exact
        path="/changepassword/"
        component={ChangePass}
        isClosed
      />
      <PrivateRoute
        exact
        path="/recoverpassword/"
        component={RecoverPass}
        isClosed={false}
      />
      <PrivateRoute exact path="/profile/" component={Profile} isClosed />
      <PrivateRoute path="*" component={Page404} />
    </Switch>
  );
}
