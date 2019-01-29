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

  componentDidUpdate() {
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    const {
      maxWidth,
    } = this.state;

    const {
      width,
    } = this.props;

    const vpw = getViewportWidth();
    const nextvpw = vpw < 1300 ? 1300 : vpw;
    // vpw = 1300
    const breakPoint = 1600;
    const sum = width * (1 - ((breakPoint - nextvpw) / 1000));
    if (maxWidth === 0) {
      this.setState({ maxWidth: sum <= 0 ? width : sum });
      return;
    }

    if (nextvpw <= breakPoint && vpw > 768 && maxWidth !== sum && sum !== 0) {
      this.setState({ maxWidth: sum });
      return;
    }
    if (vpw > 768) return;

    const sumMob = (width * (1 - ((768 - vpw) / 1000))) * 0.6;
    if (vpw <= 768 && maxWidth !== sumMob  && sum !== sumMob) {
      this.setState({ maxWidth: sumMob });
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
