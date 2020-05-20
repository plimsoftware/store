import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useSelector, useDispatch } from 'react-redux';

import { Form, MainContainer, Container, Title, Button } from './styled';
import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';

export default function Register() {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth.client.id);
  const nameStored = useSelector((state) => state.auth.client.name);
  const emailStored = useSelector((state) => state.auth.client.email);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const [name, setName] = useState('');
  const [surname, setSurNome] = useState('');
  const [email, setEmail] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [location, setLocation] = useState('');
  const [locationcp, setLocationcp] = useState('');
  const [phone, setPhone] = useState(0);
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');

  React.useEffect(() => {
    if (!id) return;

    setName(nameStored);
    setEmail(emailStored);
  }, [emailStored, id, nameStored]);

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

    if (address1.length < 5 || address1.length > 100) {
      formErrors = true;

      toast.error('Morada 1 deve ter entre 5 e 100 caracteres');
    }

    if (address2.length > 100) {
      formErrors = true;

      toast.error('Morada 2 deve ter entre 5 e 100 caracteres');
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

    dispatch(
      actions.registerRequest({
        name,
        surname,
        email,
        address1,
        address2,
        location,
        locationcp,
        phone,
        password,
        id,
      })
    );
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
            E-mail*:
            <input
              type="email"
              keyboardType="email-address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite o seu e-mail"
            />
          </label>
          <label htmlFor="morada1">
            Morada 1*:
            <input
              type="text"
              className="morada1"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              placeholder="Digite a sua morada"
            />
          </label>
          <label htmlFor="morada2">
            Morada 2:
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
              type="number"
              keyboardType="phone-pad"
              min="0"
              className="telefone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Digite o seu contato telefónico"
            />
          </label>
          <label htmlFor="password">
            Password*:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite a sua password"
            />
          </label>
          <label htmlFor="repassword">
            Repita Password*:
            <input
              type="password"
              value={repassword}
              onChange={(e) => setRepassword(e.target.value)}
              placeholder="Digite a sua password"
            />
          </label>

          <Button type="submit">
            {id ? 'Atualizar dados' : 'Criar conta'}
          </Button>
        </Form>
      </Container>
    </MainContainer>
  );
}
