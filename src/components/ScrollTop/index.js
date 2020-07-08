import React, { Component } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';
import './App.css';

export default class ScrollTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showScroll: false,
    };
    this.checkScrollTop = this.checkScrollTop.bind(this);
    this.scrollTop = this.scrollTop.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.checkScrollTop);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.checkScrollTop);
  }

  scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  checkScrollTop() {
    const { showScroll } = this.state;
    if (!showScroll && window.pageYOffset > 100) {
      this.setState({ showScroll: true });
    } else if (showScroll && window.pageYOffset <= 100) {
      this.setState({ showScroll: false });
    }
  }

  render() {
    const { showScroll } = this.state;
    return (
      <FaArrowCircleUp
        className="scrollTop"
        title="Ir para o topo"
        onClick={() => this.scrollTop()}
        style={{ height: 40, display: showScroll ? 'flex' : 'none' }}
      />
    );
  }
}
