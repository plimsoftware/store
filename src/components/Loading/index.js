import React from 'react';
import Proptype from 'prop-types';
import { FaSpinner } from 'react-icons/fa';

import { Container, StyledSpinner } from './styled';

export default function Loading({ isLoading }) {
  if (!isLoading) return <></>;
  return (
    <Container>
      <div />
      <span>
        <StyledSpinner>
          <FaSpinner size={50} />
        </StyledSpinner>
      </span>
    </Container>
  );
}

Loading.defaultProps = {
  isLoading: false,
};

Loading.propTypes = {
  isLoading: Proptype.bool,
};
