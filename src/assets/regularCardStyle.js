import {
  card,
  cardHeader,
  defaultFont,
  orangeCardHeader,
  greenCardHeader,
  redCardHeader,
  blueCardHeader,
  purpleCardHeader,
} from './material-dashboard-react';

const regularCardStyle = {
  flex: {
    flex: 1,
  },
  appBarModal: {
    position: 'absolute',
  },
  contentModal: {
    marginTop: 80,
  },
  card: {
    ...card,
    marginBottom: 60,
  },
  cardPlain: {
    background: 'transparent',
    boxShadow: 'none',
  },
  cardHeader: {
    ...cardHeader,
    ...defaultFont,
  },
  cardPlainHeader: {
    marginLeft: 0,
    marginRight: 0,
  },
  cardExpansion: {
    width: '100%',
    marginLeft: '-10px',
    marginRight: '-10px',
  },
  cardContent: { paddingTop: 0 },
  iconExpansion: { top: '25%', right: '10px' },
  contentSummaryExpansion: { margin: '12px 0 !important' },
  rootSummaryExpansion: { minHeight: '30px !important' },
  orangeCardHeader,
  greenCardHeader,
  redCardHeader,
  blueCardHeader,
  purpleCardHeader,
  cardTitle: {
    color: '#FFFFFF',
    marginTop: '0',
    marginBottom: '5px',
    ...defaultFont,
    fontSize: '1.125em',
  },
  cardSubtitle: {
    ...defaultFont,
    marginBottom: '0',
    color: 'rgba(255, 255, 255, 0.62)',
    margin: '0 0 10px',
  },
  cardActions: {
    padding: '14px',
    display: 'block',
    height: 'auto',
    textAlign: 'center',
  },
  modalTitle: {
    marginLeft: '15px',
  },
};

export default regularCardStyle;
