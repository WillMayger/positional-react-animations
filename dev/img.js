import React from 'react';
import PropTypes from 'prop-types';

import { getViewportWidth } from './helpers';

export default class Img extends React.Component {
  state = {
    maxWidth: 0,
  }

  componentDidMount() {
    this.resize();
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    const {
      width,
    } = this.props;

    const {
      maxWidth,
    } = this.state;

    let vpw = getViewportWidth();
    vpw = vpw < 1300 ? 1300 : vpw;
    const breakPoint = 1600;
    const sum = width * (1 - ((breakPoint - vpw) / 1000));
    if (vpw <= breakPoint && maxWidth !== sum) {
      this.setState({ maxWidth: sum });
    }
  }

  render() {
    const {
      src,
      height,
      fullWidth,
    } = this.props;

    const {
      maxWidth,
    } = this.state;

    return (
      <img
        className="positional-react-animations-img"
        src={src}
        style={{
          maxHeight: fullWidth ? '5000px' : height,
          maxWidth: fullWidth ? '100vw' : maxWidth,
          height: 'auto',
          width: fullWidth ? '100vw' : '100%',
          margin: '0',
          display: 'block',
        }}
        alt="parallax animation item"
      />
    );
  }
}

Img.propTypes = {
  src: PropTypes.any,
  height: PropTypes.number,
  width: PropTypes.number,
  fullWidth: PropTypes.bool,
};

Img.defaultProps = {
  src: null,
  height: 1300,
  width: 1300,
  fullWidth: false,
};
