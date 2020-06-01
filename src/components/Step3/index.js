import React from 'react';
import Proptype from 'prop-types';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';

import { Container, Table, Avancar, Voltar } from './styled';

export default function Step3({ nextStep }) {
  const handleStepBack = () => {
    nextStep(2);
  };

  const handleStepForward = () => {
    nextStep(4);
  };

  return (
    <>
      <Container />
      <Table>
        <tbody>
          <tr>
            <td>
              <div className="col1">
                <Voltar type="submit" onClick={handleStepBack}>
                  <span className="letras">Voltar</span>
                  <span className="back">O</span>
                  <FaChevronCircleLeft className="BotAvanc" size={24} />
                </Voltar>
              </div>
            </td>
            <td>
              <div className="col2">
                <Avancar type="submit" onClick={handleStepForward}>
                  <span className="letras">Submeter ordem</span>
                  <span className="back">O</span>
                  <FaChevronCircleRight className="BotAvanc" size={24} />
                </Avancar>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

Step3.defaultProps = {
  nextStep: () => {},
};

Step3.propTypes = {
  nextStep: Proptype.func,
};
