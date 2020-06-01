import React, { Fragment } from "react";
import classNames from "classnames";
import { FormFeedback, Input } from "reactstrap";

export default ({
  className,
  input,
  disabled,
  length,
  value,
  onChange,
  meta: { touched, error, warning },
  ...rest
}) => {
  if (length && Number.isInteger(length)) {
    rest.minLength = length;
    rest.maxLength = length;
  }

  console.log("textInput::::", value);
  return (
    <Fragment>
      <Input
        {...input}
        {...rest}
        disabled={disabled}
        className={classNames(
          "bg-white text-info border-top-0 border-right-0 border-left-0 border-info rounded-0",
          className,
          {
            "is-invalid": touched && error
          }
        )}
      />
      {touched && error && (
        <FormFeedback className="d-block">{error}</FormFeedback>
      )}
    </Fragment>
  );
};
