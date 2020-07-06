import React, { useState } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';

import { Container } from './styled';

export default function ScrollTop() {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 200) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 200) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.addEventListener('scroll', checkScrollTop);

  return (
    <Container>
      <FaArrowCircleUp
        className="scrollTop"
        onClick={scrollTop}
        style={{ height: 40, display: showScroll ? 'flex' : 'none' }}
      />
    </Container>
  );
}
