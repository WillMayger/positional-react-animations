import React from 'react';
import PropTypes from 'prop-types';
import styles from './positional.css';

export default function Positional({ children, height, cursorEvent }) {
  const ref = React.createRef();

  let childrenWithRef;

  if (Array.isArray(children)) {
    childrenWithRef = children.map(child => (
      {
        ...child,
        props: {
          ...child.props,
          parentRef: ref,
          // bumpDown,
        },
      }
    ));
  } else {
    childrenWithRef = {
      ...children,
      props: {
        ...children.props,
        parentRef: ref,
        // bumpDown,
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
      style={height ? { height } : null}
    >
      <div className="positional-react-animations-inner">
        {childrenWithRef}
      </div>
    </div>
  );
}

Positional.propTypes = {
  children: PropTypes.any,
  height: PropTypes.string,
  cursorEvent: PropTypes.bool,
};

Positional.defaultProps = {
  children: null,
  height: '',
  cursorEvent: false,
};
