import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

const Progress = ({ className, style, message, ...rest }) => (
  <div
    className={`Progress progress-spinner ${className || ""}`}
    style={style}
    {...rest}
  >
    <div className="bounce1" />
    <div className="bounce2" />
    <div className="bounce3" />
    {message && <h6 className="progress-info mt-2">{message}</h6>}
  </div>
);
const propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  message: PropTypes.string
};

Progress.propTypes = propTypes;

export default Progress;
