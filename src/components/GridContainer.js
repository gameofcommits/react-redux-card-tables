import React from 'react';
// nodejs library to set properties for components
import PropTypes from 'prop-types';

// material-ui components
import { Grid } from '@material-ui/core';

function GridContainer({
  classes, children, className, ...rest
}) {
  return (
    <Grid container {...rest} className={className}>
      {children}
    </Grid>
  );
}

GridContainer.defaultProps = {
  className: '',
};

GridContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default GridContainer;
