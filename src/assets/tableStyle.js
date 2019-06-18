import {
  warningColor,
  primaryColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  defaultFont,
} from './material-dashboard-react';

const tableStyle = theme => ({
  fontTooltip: {
    fontSize: 13,
    lineHeight: 1.5,
    textTransform: 'uppercase',
  },
  arrowPopper: {
    maxWidth: 700,
  },
  marginPagination: {
    marginTop: '40px',
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: '20px',
  },
  iconColor: {
    color: primaryColor,
  },
  warningTableHeader: {
    color: warningColor,
  },
  primaryTableHeader: {
    color: primaryColor,
  },
  dangerTableHeader: {
    color: dangerColor,
  },
  successTableHeader: {
    color: successColor,
  },
  infoTableHeader: {
    color: infoColor,
  },
  roseTableHeader: {
    color: roseColor,
  },
  grayTableHeader: {
    color: grayColor,
  },
  table: {
    marginBottom: '0',
    width: '100%',
    maxWidth: '100%',
    backgroundColor: 'transparent',
    borderSpacing: '0',
    borderCollapse: 'collapse',
  },
  tableHeadCell: {
    ...defaultFont,
    fontSize: '1em',
    color: primaryColor,
    textTransform: 'uppercase',
  },
  tableCell: {
    ...defaultFont,
    lineHeight: '1.42857143',
    padding: '8px 8px',
    verticalAlign: 'middle',
    textTransform: 'uppercase',
  },
  tableCellCenter: {
    textAlign: 'center',
  },
  tableResponsive: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  icons: {
    width: '17px',
    height: '17px',
    color: '#FFFFFF',
  },
});

export default tableStyle;
