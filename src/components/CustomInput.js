import React from 'react';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// nodejs library that concatenates classes
import classNames from 'classnames';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
// @material-ui/icons
import { Clear, Check } from '@material-ui/icons';
// core components
import { FormHelperText, InputAdornment } from '@material-ui/core';
import customInputStyle from '../assets/customInputStyle';
import IconButton from './IconButton';

function CustomInput({ ...props }) {
  const {
    classes,
    label,
    id,
    labelProps,
    input,
    inputRootCustomClasses,
    meta,
    type,
    iconProps,
    value,
    multiline,
    rows,
    disabled,
    inputSearch,
  } = props;
  const error = meta ? meta.error : undefined;
  const touched = meta ? meta.touched : undefined;
  const success = meta ? meta.success : undefined;

  const labelClasses = classNames({
    [` ${classes.labelRootError}`]: error && touched,
    [` ${classes.labelRootSuccess}`]: success && !error,
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error && touched,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: !inputSearch,
    [classes.notUnderline]: inputSearch,
  });

  const marginTop = classNames({
    [classes.marginTop]: label === undefined,
    [inputRootCustomClasses]: inputRootCustomClasses !== undefined,
  });
  const inputClasses = classNames({
    [classes.input]: true,
    [classes.inputSearch]: inputSearch !== undefined,
  });
  const formControlClasses = classNames({
    [classes.formControl]: true,
    [classes.formControlLabel]: label !== undefined,
    [classes.inputSearchBox]: inputSearch,
  });
  return (
    <FormControl fullWidth={true} className={formControlClasses}>
      {label !== undefined ? (
        <InputLabel className={`${classes.labelRoot} ${labelClasses}`} htmlFor={id} {...labelProps}>
          {label}
        </InputLabel>
      ) : null}
      <Input
        classes={{
          input: inputClasses,
          root: marginTop,
          disabled: classes.disabled,
          underline: underlineClasses,
        }}
        id={id}
        disabled={disabled}
        type={type}
        multiline={multiline || false}
        value={(input && input.value) || value}
        onChange={props.onChange}
        onKeyUp={props.onKeyUp}
        rows={rows || 0}
        {...input}
        endAdornment={
          iconProps
          && iconProps.children
          && (!error || !touched) && (
            <InputAdornment position="end" {...iconProps}>
              <IconButton tabIndex="-1" color="simple" style={{ marginTop: '-20px' }}>
                {iconProps.children}
              </IconButton>
            </InputAdornment>
          )
        }
      />
      {error && touched ? (
        <Clear className={`${classes.feedback} ${classes.labelRootError}`} />
      ) : success && !error ? (
        <Check className={`${classes.feedback} ${classes.labelRootSuccess}`} />
      ) : null}
      {error && touched ? (
        <FormHelperText
          className={`${classes.textError} ${classes.labelRootError}`}
          id="name-error-text"
        >
          {error}
        </FormHelperText>
      ) : success ? (
        <Check className={`${classes.feedback} ${classes.labelRootSuccess}`} />
      ) : null}
    </FormControl>
  );
}

CustomInput.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  inputRootCustomClasses: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
  white: PropTypes.bool,
};

export default withStyles(customInputStyle)(CustomInput);
