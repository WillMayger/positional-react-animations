import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getViewportHeight, getViewportWidth } from './helpers';

export default function Coord({
  children,
  x,
  y,
  parentRef,
  medias,
  shadow,
  intense,
}) {
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);

  if (parentRef) {
    const speed = ((x * y) / 3) + 50;

    const viewPortHeight = getViewportHeight();
    const viewPortWidth = getViewportWidth();

    const mouseMove = (e) => {
      const midpointX = viewPortWidth / 2;
      const midpointY = viewPortHeight / 2;

      const eventX = e.pageX;
      const eventY = e.pageY - parentRef.current.offsetTop;

      const relativeX = (eventX - midpointX) / speed;
      const relativeY = (eventY - midpointY) / speed;

      setTop(relativeY);
      setLeft(relativeX);
    };

    useEffect(() => {
      if (parentRef.current) {
        parentRef.current.addEventListener('mousemove', mouseMove);
      }
      return function cleanup() {
        parentRef.current.removeEventListener('mousemove', mouseMove);
      };
    });
  }

  let coordX = x;
  let coordY = y;

  if (medias.length > 0) {
    medias.map((media) => {
      if (getViewportWidth() >= media.query) {
        coordX = media.x || 50;
        coordY = media.y || 50;
      }
      return null;
    });
  }

  return (
    <div>
      {
        shadow && (
          <div
            className={intense ? 'positional-react-animations-coord-containerShadowIntense' : 'positional-react-animations-coord-containerShadow'}
            style={{
              left: `${(coordX - 0.7) + (-left / 3)}%`,
              top: `${(coordY + 0.7) + (-top / 3)}%`,
            }}
          >
            {children}
          </div>
        )
      }

      <div
        className="positional-react-animations-coord-container"
        style={{
          left: `${coordX + -left}%`,
          top: `${coordY + -top}%`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

Coord.propTypes = {
  children: PropTypes.any,
  x: PropTypes.number,
  y: PropTypes.number,
  parentRef: PropTypes.any,
  medias: PropTypes.array,
  shadow: PropTypes.bool,
  intense: PropTypes.bool,
};

Coord.defaultProps = {
  children: null,
  x: 50,
  y: 50,
  parentRef: null,
  medias: [],
  shadow: false,
  intense: false,
};
