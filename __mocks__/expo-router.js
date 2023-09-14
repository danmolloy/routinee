import React from 'react';

const Slot = ({ children }) => {
  return <div>{children}</div>; 
};

const Link = ({ to, ...props }) => {
  return <a href={to} {...props} />; 
};

export { Link, Slot };