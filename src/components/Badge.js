import React from 'react';
import Color from 'color';

const Badge = (props) => {
  const color = Color(props.color);
  return (
    <span
      style={{
        ...styles,
        backgroundColor: color,
        color: color.isDark() ? '#fff' : '#333',
        borderColor: color.darken(0.1),
        ...props.style,
      }}
    >
      {props.children}
    </span>
  );
};

const styles = {
  padding: '3px 10px 3px 10px',
  borderRadius: '12px',
  whiteSpace: 'nowrap',
  border: '1px solid #000',
};

export default Badge;
