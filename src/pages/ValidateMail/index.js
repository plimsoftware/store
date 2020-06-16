import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';

import { MainContainer, Container, Title } from './styled';
import Loading from '../../components/Loading';
import axios from '../../services/axios';

export default function ValidateMail(props) {
  const { location } = props;
  const { search } = location;
  const [isLoading, setIsLoading] = useState(false); // isLoading
  const [runOnce, setRunOnce] = useState(true);
  const [checkOk, setCheckOk] = useState(false);

  const values = queryString.parse(search);

  useEffect(() => {
    async function validateMail() {
      if (!runOnce) return;

      setIsLoading(true);
      setRunOnce(false);

      const response = await axios.post(
        `/clients/validatemail?email=${values.email}&codigo=${values.codigo}`
      );

      if (response.data.valid) setCheckOk(true);
      setIsLoading(false);
    }

    validateMail();
  }, [runOnce, values.codigo, values.email]);

  return (
    <MainContainer>
      <Container>
        <Loading isLoading={isLoading} />
        {checkOk ? (
          <Title>O seu endereço de email foi validado com sucesso </Title>
        ) : (
          <Title>
            Ocorreu um erro na validação, tente submeter um novo email de
            verificação através do seu perfil.
          </Title>
        )}
        <p>Muito obrigado!</p>
      </Container>
    </MainContainer>
  );
}

ValidateMail.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};
