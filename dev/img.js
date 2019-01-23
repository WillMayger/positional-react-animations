import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getViewportWidth } from './helpers';

export default function Img({ src, height, width, className }) {

  const [maxWidth, setMaxWidth] = useState(width);

  const resize = () => {
    let vpw = getViewportWidth();
    vpw = vpw < 1300 ? 1300 : vpw;
    const breakPoint = 1600;
    const sum = width * (1 - ((breakPoint - vpw) / 1000));
    if (vpw <= breakPoint && maxWidth !== sum) {
      setMaxWidth(sum);
    }
  };

  resize();

  useEffect(() => {
    window.addEventListener('resize', resize);
    return function cleanup() {
      window.removeEventListener('resize', resize);
    };
  });

  return (
    <img
      className={`positional-react-animations-img ${className}`}
      src={src}
      style={{
        maxHeight: height,
        maxWidth,
        height: 'auto',
        width: 'auto',
        margin: '0',
        display: 'block',
      }}
      alt="parallax animation item"
    />
  );
}

Img.propTypes = {
  src: PropTypes.any,
  height: PropTypes.number,
  width: PropTypes.number,
  className: PropTypes.any,
};

Img.defaultProps = {
  src: null,
  height: 1300,
  width: 1300,
  className: null,
};
