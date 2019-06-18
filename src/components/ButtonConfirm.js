import React from 'react';
import { Check, Clear } from '@material-ui/icons';
import {
  Popover, Tooltip, Typography, withStyles,
} from '@material-ui/core';
import IconButtonCustom from './IconButtonCustom';

class ButtonConfirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  handleClick(event) {
    this.setState({
      anchorEl: event.currentTarget,
    });
  }

  handleClose() {
    this.setState({
      anchorEl: null,
    });
  }

  render() {
    const {
      action, item, classes, position,
    } = this.props;
    const { anchorEl } = this.state;
    return [
      <Tooltip
        title={
          <span
            style={{
              fontSize: 13,
              lineHeight: 1.5,
              textTransform: 'uppercase',
            }}
          >
            {action.title && typeof action.title === 'function'
              ? action.title(item)
              : action.title || ''}
          </span>
        }
        key="0"
      >
        <IconButtonCustom color={action.color} onClick={this.handleClick.bind(this)}>
          {action.icon && <action.icon />}
        </IconButtonCustom>
      </Tooltip>,
      <Popover
        key="1"
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={this.handleClose.bind(this)}
        anchorOrigin={{
          vertical: 'center',
          horizontal: position === 'right' ? 'right' : 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: position === 'right' ? 'left' : 'right',
        }}
        className={classes.popover}
      >
        <Typography className={classes.typography}>{action.title}?</Typography>

        <IconButtonCustom title={'Não'} color={'danger'} onClick={this.handleClose.bind(this)}>
          <Clear />
        </IconButtonCustom>

        <IconButtonCustom
          title={'Sim'}
          color={'primary'}
          className={classes[action.buttonClass]}
          onClick={() => {
            action.click(item);
            this.handleClose();
          }}
        >
          <Check />
        </IconButtonCustom>
      </Popover>,
    ];
  }
}

const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2,
  },
  popover: {
    textAlign: 'center',
  },
  white: {
    padding: 0,
    marginLeft: '10px',
    color: 'rgba(255,255,255,.5)',
  },
});

export default withStyles(styles)(ButtonConfirm);
