import React from 'react';

import { withStyles, IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import iconButtonColorStyle from '../assets/iconButtonColorStyle';

function IconCustomButton({
  classes, color, children, customClass, ...rest
}) {
  return (
    <IconButton
      {...rest}
      className={`${classes.iconButton} ${color ? ` ${classes[color]}` : ''}${
        customClass ? ` ${customClass}` : ''
      }`}
    >
      {children}
    </IconButton>
  );
}

IconCustomButton.propTypes = {
  children: PropTypes.symbol,
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf([
    'primary',
    'info',
    'success',
    'warning',
    'danger',
    'rose',
    'white',
    'simple',
  ]),
  customClass: PropTypes.string,
  disabled: PropTypes.bool,
};

export default withStyles(iconButtonColorStyle)(IconCustomButton);
