import React from 'react';
import PropTypes from 'prop-types';
import { getViewportHeight, getViewportWidth } from './helpers';

export default class Coord extends React.Component {
  state = {
    left: 0,
    top: 0,
  }

  componentDidMount() {
    // when ref is ready, create event listener
    const addRefListener = () => {
      if (this.props.parentRef && this.props.parentRef.current) {
        this.props.parentRef.current.addEventListener('mousemove', this.mouseMove);
      } else {
        requestAnimationFrame(addRefListener);
      }
    };

    requestAnimationFrame(addRefListener);
  }

  componentWillUpdate(prevProps) {
    const {
      parentRef,
    } = this.props;

    if (parentRef && !prevProps.parentRef) {
      parentRef.current.addEventListener('mousemove', this.mouseMove);
    }
  }

  componentWillUnmount() {
    const {
      parentRef,
    } = this.props;
    if (parentRef && parentRef.current) {
      parentRef.current.removeEventListener('mousemove', this.mouseMove);
    }
  }

  mouseMove = (e) => {
    const {
      x,
      y,
      parentRef,
    } = this.props;

    if (parentRef) {
      const speed = ((x * y) / 3) + 50;

      const viewPortHeight = getViewportHeight();
      const viewPortWidth = getViewportWidth();

      const midpointX = viewPortWidth / 2;
      const midpointY = viewPortHeight / 2;

      const eventX = e.pageX;
      const eventY = e.pageY - parentRef.current.offsetTop;

      const relativeX = (eventX - midpointX) / speed;
      const relativeY = (eventY - midpointY) / speed;

      this.setState({
        top: relativeY,
        left: relativeX,
      });
    }
  }

  render() {
    const {
      children,
      x,
      y,
      medias,
      shadow,
      intense,
      fullWidth,
    } = this.props;

    const {
      top,
      left,
    } = this.state;

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
          className={fullWidth ? 'positional-react-animations-coord-containerFull' : 'positional-react-animations-coord-container'}
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
}

Coord.propTypes = {
  children: PropTypes.any,
  x: PropTypes.number,
  y: PropTypes.number,
  parentRef: PropTypes.any,
  medias: PropTypes.array,
  shadow: PropTypes.bool,
  intense: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

Coord.defaultProps = {
  children: null,
  x: 50,
  y: 50,
  parentRef: null,
  medias: [],
  shadow: false,
  intense: false,
  fullWidth: false,
};
