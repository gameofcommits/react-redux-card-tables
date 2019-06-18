import React from 'react';
import { withStyles, Grid } from '@material-ui/core';

const style = {
  grid: {
    position: 'relative',
    width: '100%',
    minHeight: '1px',
    paddingRight: '15px',
    paddingLeft: '15px',
    flexBasis: 'auto',
  },
  gridJustify: {
    textAlign: 'center',
  },
};

function GridItem({
  classes, children, className, center, ...rest
}) {
  return (
    <Grid
      item
      {...rest}
      className={`${classes.grid} ${className} ${center ? classes.gridJustify : ''}`}
    >
      {children}
    </Grid>
  );
}

export default withStyles(style)(GridItem);
