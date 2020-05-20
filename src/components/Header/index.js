import React from 'react';
import { FaSignInAlt, FaUserAlt, FaPowerOff } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from '../../store/modules/auth/actions';
import history from '../../services/history';
import { Nav, NavLeft, NavRight, NavHeader } from './styled';
import logo from '../../img/logo.png';

export default function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const tipo = 'cliente';

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(actions.loginFailure());
    history.push('/');
  };

  return (
    <Nav>
      <NavHeader>
        <NavLeft>
          <Link to="/">
            <img src={logo} alt="Online Store" />
          </Link>
        </NavLeft>
        <NavRight>
          {isLoggedIn ? (
            <Link onClick={handleLogout} to="/logout">
              <FaPowerOff size={20} />
            </Link>
          ) : (
            <Link to={`/login/${tipo}`}>
              Iniciar Sessão <FaSignInAlt size={20} />
            </Link>
          )}
          {isLoggedIn && <FaUserAlt size={20} />}
        </NavRight>
      </NavHeader>
    </Nav>
  );
}
