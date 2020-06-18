import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useSelector, useDispatch } from 'react-redux';
import { get } from 'lodash';

import {
  Form,
  MainContainer,
  Container,
  Title,
  Button,
  Button2,
  Verified,
  Notverified,
} from './styled';
import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';
import axios from '../../services/axios';
import history from '../../services/history';
import randCode from '../../modules/generateRandomCode';

export default function Register() {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth.client.id);
  const [isLoading, setIsLoading] = useState(false); // isLoading
  const [name, setName] = useState('');
  const [surname, setSurNome] = useState('');
  const [email, setEmail] = useState('');
  const [emailVerification, setEmailVerification] = useState(false);
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [location, setLocation] = useState('');
  const [locationcp, setLocationcp] = useState('');
  const [phone, setPhone] = useState(0);
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');

  async function sendVerification(emailSend, codigo) {
    await axios.post(`/clients/sendmail?email=${emailSend}&codigo=${codigo}`);
  }

  useEffect(() => {
    if (!id) return;

    async function getData() {
      // setRunGetData(false);

      try {
        setIsLoading(true);
        const { data } = await axios.get(`/clients/?${id}`);

        setName(data[0].name);
        setSurNome(data[0].surname);
        setEmail(data[0].email);
        setEmailVerification(data[0].email_verification);
        setAddress1(data[0].address1);
        setAddress2(data[0].address2);
        setLocationcp(data[0].locationcp);
        setLocation(data[0].location);
        setPhone(data[0].phone);
      } catch (err) {
        setIsLoading(false);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);

        if (status === 400) errors.map((error) => toast.error(error));
        history.push('/');
        if (status === 401)
          errors.map(() =>
            toast.error('A sua sessão expirou faça login novamente')
          );
        dispatch(actions.loginFailure());
        history.push('/');
      }

      setIsLoading(false);
    }

    getData();
  }, [id, dispatch]);

  const handleClick = (evt) => {
    evt.preventDefault();
    history.push('/profile');
  };

  const handlePhonechange = (evt) => {
    if (!evt.match(/^[0-9]+$/)) return;
    setPhone(evt);
  };

  async function handleClickVerification(evt) {
    evt.preventDefault();

    const codigo = randCode(25, true, true, true, false);
    await sendVerification(email, codigo);

    toast.info(
      'Foi enviado um mail de verificação para a sua caixa de correio'
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const regex = /^\d{4}(-\d{3})?$/;

    let formErrors = false;

    if (name.length < 1 || name.length > 100) {
      formErrors = true;

      toast.error('Nome deve ter entre 1 e 100 caracteres');
    }

    if (surname.length < 1 || surname.length > 100) {
      formErrors = true;

      toast.error('Apelido deve ter entre 1 e 100 caracteres');
    }

    if (!isEmail(email)) {
      formErrors = true;

      toast.error('E-mail inválido');
    }

    if (!id) {
      try {
        const response = await axios.post('/clients/checkmail/', {
          email,
        });

        if (response.data.valid) {
          formErrors = true;

          toast.error('E-mail já existe');
        }
      } catch (err) {
        history.push('/404');
      }
    }

    if (address1.length < 5 || address1.length > 100) {
      formErrors = true;

      toast.error('Morada deve ter entre 5 e 100 caracteres');
    }

    if (address2.length > 100) {
      formErrors = true;

      toast.error('Morada (cont.) deve ter entre 0 e 100 caracteres');
    }

    if (location.length < 3 || location.length > 35) {
      formErrors = true;

      toast.error('Localidade deve ter entre 3 e 35 caracteres');
    }

    if (!regex.test(locationcp)) {
      formErrors = true;

      toast.error('Código Postal não está no formato correto ( 0000-000 )');
    }

    if (Number.isNaN(phone) || phone.toString.length > 9) {
      formErrors = true;

      toast.error('Telefone inválido');
    }

    if (!id && (password.length < 6 || password.length > 50)) {
      formErrors = true;

      toast.error('Password deve ter entre 6 e 50 caracteres');
    }

    if (password !== repassword) {
      formErrors = true;

      toast.error('As Passwords não estão iguais');
    }

    if (formErrors) return;

    const codigo = randCode(25, true, true, true, false);

    dispatch(
      actions.registerRequest({
        name,
        surname,
        email,
        address1,
        address2,
        location,
        locationcp,
        verificationCode: codigo,
        emailVerification: false,
        phone,
        password,
        id,
      })
    );

    if (!id) await sendVerification(email, codigo);
  }

  function CheckMail() {
    if (id)
      return (
        <>
          {emailVerification ? (
            <Verified>Válido</Verified>
          ) : (
            <Notverified>
              Falta validar
              <button
                type="submit"
                onClick={(evt) => handleClickVerification(evt)}
              >
                Enviar novo mail de validação
              </button>
            </Notverified>
          )}
        </>
      );

    return <></>;
  }

  return (
    <MainContainer>
      <Container>
        <Loading isLoading={isLoading} />
        <Title>{id ? 'Editar dados' : 'Crie a sua conta'}</Title>
        <p>* - campo de preenchimento obrigatório</p>
        <Form onSubmit={handleSubmit}>
          <label htmlFor="nome">
            Nome*:
            <input
              type="text"
              className="nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite o seu nome"
            />
          </label>
          <label htmlFor="apelido">
            Apelido*:
            <input
              type="text"
              className="apelido"
              value={surname}
              onChange={(e) => setSurNome(e.target.value)}
              placeholder="Digite o seu apelido"
            />
          </label>
          <label htmlFor="email">
            E-mail*: <CheckMail />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite o seu e-mail"
            />
          </label>
          <label htmlFor="morada1">
            Morada*:
            <input
              type="text"
              className="morada1"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              placeholder="Digite a sua morada"
            />
          </label>
          <label htmlFor="morada2">
            Morada (cont.):
            <input
              type="text"
              className="morada2"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              placeholder="Digite a sua morada"
            />
          </label>
          <div>
            <span className="local">
              <label htmlFor="localidade">
                Localidade*:
                <input
                  type="text"
                  className="localidade"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Digite a sua localidade"
                />
              </label>
            </span>
            <span className="cp">
              <label htmlFor="localidadecp">
                Código Postal*:
                <input
                  type="text"
                  className="localidadecp"
                  value={locationcp}
                  onChange={(e) => setLocationcp(e.target.value)}
                  placeholder="0000-000"
                />
              </label>
            </span>
          </div>
          <label htmlFor="telefone">
            Telefone:
            <input
              type="text"
              className="telefone"
              value={phone}
              onChange={(e) => handlePhonechange(e.target.value)}
              placeholder="Digite o seu contato telefónico"
            />
          </label>
          {id ? (
            <></>
          ) : (
            <>
              <label htmlFor="password">
                Password*:
                <input
                  type="password"
                  value={password}
                  autoComplete="off"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite a sua password"
                />
              </label>
              <label htmlFor="repassword">
                Repita Password*:
                <input
                  type="password"
                  value={repassword}
                  autoComplete="off"
                  onChange={(e) => setRepassword(e.target.value)}
                  placeholder="Digite a sua password"
                />
              </label>
            </>
          )}

          <Button type="submit">
            {id ? 'Atualizar dados' : 'Criar conta'}
          </Button>
          <Button2 type="submit" onClick={(evt) => handleClick(evt)}>
            Voltar
          </Button2>
        </Form>
      </Container>
    </MainContainer>
  );
}
