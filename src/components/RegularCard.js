import React from 'react';
import {
  withStyles,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Close } from '@material-ui/icons';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from './IconButton';
import regularCardStyle from '../assets/regularCardStyle';

function RegularCard({ ...props }) {
  const {
    classes,
    headerColor,
    plainCard,
    cardTitle,
    cardSubtitle,
    content,
    footer,
    cardHeaderAction,
    modalName,
    modalClose,
    getButton,
    noTitle,
    expansion,
  } = props;
  const plainCardClasses = cx({
    [` ${classes.cardPlain}`]: plainCard,
  });
  const cardPlainHeaderClasses = cx({
    [` ${classes.cardPlainHeader}`]: plainCard,
  });

  if (modalName) {
    return [
      <AppBar className={`${classes[`${headerColor}CardHeader`]} ${classes.appBarModal}`} key={0}>
        <Toolbar>
          {modalClose && (
            <IconButton
              color="simple"
              onClick={() => {
                modalClose(modalName);
              }}
              aria-label="Close"
            >
              <Close />
            </IconButton>
          )}
          <Typography
            variant="title"
            color="inherit"
            className={`${classes.flex} ${classes.modalTitle}`}
          >
            {cardTitle}
          </Typography>
          {getButton && getButton}
        </Toolbar>
      </AppBar>,
      <CardContent className={classes.contentModal} key={1}>
        {content}
      </CardContent>,
      <CardActions key={2} className={classes.cardActions}>
        {footer}
      </CardActions>,
    ];
  }

  if (expansion) {
    return (
      <Card className={classes.card + plainCardClasses}>
        <ExpansionPanel>
          {!noTitle && (
            <ExpansionPanelSummary
              classes={{
                expandIcon: classes.iconExpansion,
                root: classes.rootSummaryExpansion,
                content: classes.contentSummaryExpansion,
              }}
              expandIcon={<ExpandMoreIcon />}
            >
              <CardHeader
                classes={{
                  root: `${classes.cardHeader} ${
                    classes[`${headerColor}CardHeader`]
                  }${cardPlainHeaderClasses} ${classes.cardExpansion}`,
                  title: classes.cardTitle,
                  subheader: classes.cardSubtitle,
                }}
                title={cardTitle}
                subheader={cardSubtitle}
                action={cardHeaderAction}
              />
            </ExpansionPanelSummary>
          )}
          <CardContent classes={{ root: classes.cardContent }}>{content}</CardContent>
          {footer !== undefined ? (
            <CardActions className={classes.cardActions}>{footer}</CardActions>
          ) : null}
        </ExpansionPanel>
      </Card>
    );
  }

  return (
    <Card className={classes.card + plainCardClasses}>
      {!noTitle && (
        <CardHeader
          classes={{
            root: `${classes.cardHeader} ${
              classes[`${headerColor}CardHeader`]
            }${cardPlainHeaderClasses}`,
            title: classes.cardTitle,
            subheader: classes.cardSubtitle,
          }}
          title={cardTitle}
          subheader={cardSubtitle}
          action={cardHeaderAction}
        />
      )}
      <CardContent>{content}</CardContent>
      {footer !== undefined ? (
        <CardActions className={classes.cardActions}>{footer}</CardActions>
      ) : null}
    </Card>
  );
}

RegularCard.defaultProps = {
  headerColor: 'green',
};

RegularCard.propTypes = {
  plainCard: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  headerColor: PropTypes.oneOf(['orange', 'green', 'red', 'blue', 'purple']),
  cardTitle: PropTypes.node,
  cardSubtitle: PropTypes.node,
  content: PropTypes.node,
  footer: PropTypes.node,
};

export default withStyles(regularCardStyle)(RegularCard);
