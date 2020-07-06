import styled from 'styled-components';

export const Container = styled.div`
  .scrollTop {
    position: fixed;
    width: 20%;
    bottom: 20px;
    right: 10px;
    align-items: center;
    height: 20px;
    justify-content: center;
    z-index: 1000;
    cursor: pointer;
    animation: fadeIn 0.3s;
    transition: opacity 0.4s;
    opacity: 0.5;

    &:hover {
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 0.5;
    }
  }
`;
