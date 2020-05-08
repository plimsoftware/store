import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 30px;

  div {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  span {
    z-index: 2;
  }
`;

export const StyledSpinner = styled.svg`
  animation: rotate 1s linear infinite;
  margin: 50px;
  width: 50px;
  height: 50px;

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
`;
