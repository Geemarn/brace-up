import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Card, CardBody, CardGroup, Col, Container, Row } from "reactstrap";
import { resetPassword } from "../../redux/actions";
import ResetPasswordForm from "./ResetPasswordForm";

const propTypes = {
  isResettingPassword: PropTypes.bool,
  resetPassword: PropTypes.func.isRequired
};

const defaultProps = {
  isResettingPassword: false
};

const ResetPassword = props => {
  const { resetPassword, isResettingPassword } = props;

  const handleSubmit = values => {
    const data = {
      ...values
    };
    resetPassword(data);
  };

  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center mt-5 pt-5">
          <Col md="6" xs="12" lg="6">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <ResetPasswordForm
                    onSubmit={handleSubmit}
                    formLoading={isResettingPassword}
                  />
                  <p className="mt-3">
                    Want to login? <Link to="/">Login here </Link>
                  </p>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

ResetPassword.propTypes = propTypes;
ResetPassword.defaultProps = defaultProps;

const stateProps = state => ({
  isResettingPassword: state.ui.loading["resetPassword"]
});
const dispatchProps = {
  resetPassword
};
export default connect(stateProps, dispatchProps)(ResetPassword);
