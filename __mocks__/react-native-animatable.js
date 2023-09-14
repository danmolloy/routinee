import React from 'react';

const View = ({ children, style, ...props }) => {

  return (
    <div style={style} {...props}>
      {children}
    </div>
  );
};

export { View };