import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import queryString from 'query-string';
import PropTypes from 'prop-types';

import { Form, MainContainer, Container, Title, Button } from './styled';
import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';
import axios from '../../services/axios';
import history from '../../services/history';

export default function RecoverPass(props) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false); // isLoading
  const [repassword, setRepassword] = useState('');
  const [repassword2, setRepassword2] = useState('');
  const [id, setId] = useState('');

  const { location } = props;
  const { search } = location;
  const values = queryString.parse(search);

  useEffect(() => {
    async function getData() {
      try {
        const dataAtual = new Date();
        const response = await axios.post('/clients/checkmail/', {
          email: values.email,
        });

        setId(response.data.id);

        if (response.data.verification_code !== values.codigo) {
          toast.error('Erro ao verificar e-mail');
          history.push('/');
        }
        const dataSent = new Date(response.data.code_expired);

        if (dataAtual.getDate() !== dataSent.getDate()) {
          toast.error(
            'Código de reposição expirou, solicite nova recuperação.'
          );
          history.push('/');
        }
      } catch (err) {
        toast.error('Erro ao verificar e-mail');
        history.push('/');
      }
    }

    getData();
  }, [values.email, values.codigo, values.id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

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

    await axios.post(`/clients/changepass/${id}`, {
      password: repassword,
      code_expired: null,
      verification_code: '',
    });

    setIsLoading(false);

    toast.info('Password alterada com sucesso!');
    dispatch(actions.loginFailure());
    history.push('/');
  }

  return (
    <MainContainer>
      <Container>
        <Loading isLoading={isLoading} />
        <Title>Alterar password</Title>
        <Form onSubmit={handleSubmit}>
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
        </Form>
      </Container>
    </MainContainer>
  );
}

RecoverPass.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};
