import React from 'react';
import PropTypes from 'prop-types';
import './positional.css';
import CoordComp from './coord';
import ImgComp from './img';

export default class Positional extends React.Component {
  render() {
    const {
      children,
      height,
      cursorEvent,
      fullWidth,
    } = this.props;

    const ref = React.createRef();

    let childrenWithRef;

    if (Array.isArray(children)) {
      childrenWithRef = children.map(child => (
        {
          ...child,
          props: {
            ...child.props,
            parentRef: ref,
          },
        }
      ));
    } else {
      childrenWithRef = {
        ...children,
        props: {
          ...children.props,
          parentRef: ref,
        },
      };
    }

    if (!cursorEvent) {
      childrenWithRef = children;
    }

    return (
      <div
        ref={ref}
        className="positional-react-animations-container"
        style={height && !fullWidth ? { height } : null}
      >
        <div className={fullWidth ? 'positional-react-animations-innerFull' : 'positional-react-animations-inner'}>
          {childrenWithRef}
        </div>
      </div>
    );
  }
}

Positional.propTypes = {
  children: PropTypes.any,
  height: PropTypes.string,
  cursorEvent: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

Positional.defaultProps = {
  children: null,
  height: '',
  cursorEvent: false,
  fullWidth: false,
};

export const Coord = CoordComp;
export const Img = ImgComp;
