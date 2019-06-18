import {
  roseColor,
  primaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
} from './material-dashboard-react';

const iconButtonColorStyle = {
  primary: {
    color: primaryColor,
  },
  info: {
    color: infoColor,
  },
  success: {
    color: successColor,
  },
  warning: {
    color: warningColor,
  },
  danger: {
    color: dangerColor,
  },
  rose: {
    color: roseColor,
  },
  white: {
    '&,&:focus,&:hover': {
      color: '#FFFFFF',
    },
  },
  simple: {
    color: '#FFFFFF',
    background: 'transparent',
    boxShadow: 'none',
  },
  iconButton: {
    width: '40px',
    height: '40px',
    padding: 0,
  },
};

export default iconButtonColorStyle;
