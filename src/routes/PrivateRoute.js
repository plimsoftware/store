import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export default function PrivateRoute({
  component: Component,
  isClosed,
  isAdmin,
  ...rest
}) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const admin = useSelector((state) => state.auth.admin);
  const tipo = 'cliente';

  if (isAdmin && !admin) {
    return (
      <Redirect
        to={{
          pathname: `/`,
          state: { prevPath: rest.location.pathname },
        }}
      />
    );
  }

  if (isClosed && !isLoggedIn) {
    return (
      <Redirect
        to={{
          pathname: `/login/${tipo}`,
          state: { prevPath: rest.location.pathname },
        }}
      />
    );
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...rest} component={Component} />;
}

PrivateRoute.defaultProps = {
  isClosed: false,
  isAdmin: false,
};

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  isClosed: PropTypes.bool,
  isAdmin: PropTypes.bool,
};
