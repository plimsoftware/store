import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';

import {
  Form,
  MainContainer,
  Container,
  Title,
  Button,
  Button2,
} from './styled';
import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';
import axios from '../../services/axios';
import history from '../../services/history';

export default function ChangePass() {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth.client.id);
  const email = useSelector((state) => state.auth.client.email);
  const [isLoading, setIsLoading] = useState(false); // isLoading
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [repassword2, setRepassword2] = useState('');

  const handleClick = (evt) => {
    evt.preventDefault();
    history.push('/profile');
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('/tokens/checkpass/', {
        email,
        password,
      });
      if (!response.data.valid) {
        toast.info('Password atual incorrecta');
        setIsLoading(false);
        return;
      }
    } catch (err) {
      const status = get(err, 'response.status', 0);

      if (status === 401) {
        toast.info('Password atual incorrecta');
        setIsLoading(false);
        return;
      }
    }

    let formErrors = false;

    if (repassword.length < 6 || repassword.length > 50) {
      formErrors = true;

      toast.error('Password deve ter entre 6 e 50 caracteres');
    }

    if (repassword !== repassword2) {
      formErrors = true;

      toast.error('As Passwords não estão iguais');
    }

    if (formErrors) {
      setIsLoading(false);
      return;
    }

    dispatch(
      actions.registerRequest({
        password: repassword,
        id,
      })
    );
    setIsLoading(false);

    toast.info('Faça novamente login no sistema');
    dispatch(actions.loginFailure());
    history.push('/');
  }

  return (
    <MainContainer>
      <Container>
        <Loading isLoading={isLoading} />
        <Title>Alterar password</Title>
        <Form onSubmit={handleSubmit}>
          <label htmlFor="password">
            Password atual:
            <input
              type="password"
              value={password}
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite a sua password atual"
            />
          </label>
          <label htmlFor="repassword">
            Nova password:
            <input
              type="password"
              value={repassword}
              autoComplete="off"
              onChange={(e) => setRepassword(e.target.value)}
              placeholder="Digite a sua nova password"
            />
          </label>
          <label htmlFor="repassword2">
            Repita nova password:
            <input
              type="password"
              value={repassword2}
              autoComplete="off"
              onChange={(e) => setRepassword2(e.target.value)}
              placeholder="Digite a sua nova password"
            />
          </label>
          <Button type="submit">Atualizar password</Button>
          <Button2 type="submit" onClick={(evt) => handleClick(evt)}>
            Voltar
          </Button2>
        </Form>
      </Container>
    </MainContainer>
  );
}
