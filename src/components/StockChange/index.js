import React, { useState } from 'react';
import Proptype from 'prop-types';

import { ProdContainer, Container, Close, Button } from './styled';

export default function StockChange({ detailStatusPrompt, from, to, close }) {
  const [qtd, setQtd] = useState(0);

  const handleClick = (evt) => {
    evt.preventDefault();
    close(qtd);
  };

  const TitleStock = () => {
    if (to === 'Delete') return <>Eliminar stock</>;
    if (to === 'Add') return <>Adicionar stock</>;

    return (
      <>
        Transferir de {from} para {to}
      </>
    );
  };

  if (!detailStatusPrompt) return <></>;
  return (
    <Container>
      <ProdContainer>
        <Close onClick={() => close(qtd)}>
          <strong>X</strong>
        </Close>

        <fieldset>
          <legend>
            <strong>
              <TitleStock />
            </strong>
          </legend>
          <label htmlFor="qtd">
            Quantidade:
            <input
              type="number"
              className="qtd"
              value={qtd}
              onChange={(e) => {
                if (!e.target.value.match(/^[0-9]+$/)) return;
                setQtd(e.target.value);
              }}
              placeholder="Digite a quantidade"
            />
          </label>
          <Button onClick={handleClick}>Ok</Button>
        </fieldset>
      </ProdContainer>
    </Container>
  );
}

StockChange.defaultProps = {
  detailStatusPrompt: false,
  from: '',
  to: '',
  close: () => {},
};

StockChange.propTypes = {
  detailStatusPrompt: Proptype.bool,
  from: Proptype.string,
  to: Proptype.string,
  close: Proptype.func,
};
