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
  const { isLoggedIn, admin } = useSelector((state) => state.auth);
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
          {isLoggedIn && admin ? (
            <Link to="/adminconsole">
              <img
                src={logo}
                title="Voltar à consola de administração"
                alt="Online Store"
              />
            </Link>
          ) : (
            <Link to="/">
              <img
                src={logo}
                title="Voltar à página inicial"
                alt="Online Store"
              />
            </Link>
          )}
        </NavLeft>
        <NavRight>
          {isLoggedIn ? (
            <Link title="Sair sessão" onClick={handleLogout} to="/logout">
              <FaPowerOff size={15} />
            </Link>
          ) : (
            <Link to={`/login/${tipo}`}>
              Iniciar Sessão <FaSignInAlt size={15} />
            </Link>
          )}
          {isLoggedIn && !admin && (
            <Link title="Perfil" to="/profile/">
              <FaUserAlt size={15} />
            </Link>
          )}
        </NavRight>
      </NavHeader>
    </Nav>
  );
}
