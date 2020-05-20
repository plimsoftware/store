import React from 'react';
import { Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Login from '../pages/Login';
import Aluno from '../pages/Aluno';
import Products from '../pages/Products';
import Fotos from '../pages/Fotos';
import Register from '../pages/Register';
import Checkout from '../pages/Checkout';
import Page404 from '../pages/Page404';

export default function Routes() {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Products} isClosed={false} />
      <PrivateRoute exact path="/aluno/:id/edit" component={Aluno} isClosed />
      <PrivateRoute exact path="/aluno/" component={Aluno} isClosed />
      <PrivateRoute exact path="/fotos/:id" component={Fotos} isClosed />
      <PrivateRoute exact path="/checkout/" component={Checkout} isClosed />
      <PrivateRoute exact path="/admin/" component={Login} isClosed={false} />
      <PrivateRoute
        exact
        path="/login/:tipo"
        component={Login}
        isClosed={false}
      />
      <PrivateRoute
        exact
        path="/register/"
        component={Register}
        isClosed={false}
      />
      <PrivateRoute path="*" component={Page404} />
    </Switch>
  );
}
