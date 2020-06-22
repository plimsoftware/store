import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';

import Loading from '../../components/Loading';
import {
  Form,
  Title,
  ContainerLogin,
  MainContainer,
  Button,
  Button2,
  ButtonRes,
} from './styled';
import * as actions from '../../store/modules/auth/actions';
import axios from '../../services/axios';
import randCode from '../../modules/generateRandomCode';

export default function Login(props) {
  const dispatch = useDispatch();

  const prevPath = get(props, 'location.state.prevPath', '/');
  const tipo = get(props, 'match.params.tipo', '');
  const isLoading = useSelector((state) => state.auth.isLoading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function recoverPass(evt) {
    evt.preventDefault();

    if (!isEmail(email)) {
      toast.error('Preencha o campo e-mail');
      return;
    }

    try {
      await axios.post('/clients/checkmail/', {
        email,
      });

      const codigo = randCode(25, true, true, true, false);

      await axios.post(`/clients/sendmailpass?email=${email}&codigo=${codigo}`);
      toast.info(
        'Foi enviado um mail de recuperação de password para a sua caixa'
      );
    } catch (err) {
      toast.error('E-mail não existe');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const userType = tipo ? 'client' : 'admin';
    let formErrors = false;

    if (!isEmail(email)) {
      formErrors = true;

      toast.error('E-mail inválido');
    }

    if (password.length < 6 || password.length > 50) {
      formErrors = true;

      toast.error('Password inválida');
    }

    if (formErrors) return;

    dispatch(actions.loginRequest({ email, password, prevPath, userType }));
  }

  return (
    <MainContainer>
      <ContainerLogin>
        <Loading isLoading={isLoading} />
        <Title>{tipo ? 'Iniciar Sessão' : 'Acesso Administração'}</Title>
        <Form onSubmit={handleSubmit}>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite o seu e-mail"
          />
          <input
            type="password"
            value={password}
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite a sua password"
          />
          <Button type="submit">Entrar</Button>
          {tipo && (
            <Button2 onClick={(evt) => recoverPass(evt)}>
              Recuperar password
            </Button2>
          )}
          {tipo && <ButtonRes to="/register">Criar novo Utilizador</ButtonRes>}
        </Form>
      </ContainerLogin>
    </MainContainer>
  );
}
