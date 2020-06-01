import React, { Fragment } from 'react';
import classNames from 'classnames';
import { FormFeedback, Input } from 'reactstrap';

export default ({
  className,
  input,
  disabled,
  length,
  meta: { touched, error, warning },
  ...rest
}) => {
  if (length && Number.isInteger(length)) {
    rest.minLength = length;
    rest.maxLength = length;
  }
  return (
    <Fragment>
      <Input
        {...input}
        {...rest}
        disabled={disabled}
        className={classNames(className, {
          'is-invalid': touched && error,
        })}
        style={{ minHeight: 100, resize: 'none' }}
        type="textarea"
      />
      {touched && error && (
        <FormFeedback className="d-block">{error}</FormFeedback>
      )}
    </Fragment>
  );
};
