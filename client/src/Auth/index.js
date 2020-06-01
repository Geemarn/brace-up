import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import Hero from "./_shared/Hero";
import Delimeter from "./_shared/Delimeter";
import { Card, CardBody, Col, Container, Button, Row } from "reactstrap";
import { login, register } from "../redux/actions/index";
import LoginForm from "./Login/LoginForm";
import RegisterForm from "./Register/RegisterForm";
import { navigateTo } from "../redux/actions";
import store from "../redux/store";
import "./index.scss";

const propTypes = {
  isLoggingIn: PropTypes.bool,
  login: PropTypes.func.isRequired
};

const defaultProps = {
  isLoggingIn: false
};

const StyledForm = styled.div`
  #card {
    box-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.1);
  }
`;

const Auth = props => {
  const {
    login,
    isLoggingIn,
    isRegistring,
    navigateTo,
    register,
    location: { pathname }
  } = props;
  const [loginView, setLoginView] = useState(true);

  useEffect(() => {
    store.dispatch({ type: "RESET_APP_STATE" });
  }, []);

  useEffect(() => {
    if (!loginView) {
      navigateTo("/register");
    }
  }, [loginView, navigateTo]);

  const handleLoginSubmit = values => {
    login(values);
  };

  const handleRegisterSubmit = values => {
    register(values);
  };

  return (
    <div>
      <Container fluid>
        <Row className=" d-flex justify-content-center py-5 my-5">
          <Col md="8" xs="8" lg="8">
            <StyledForm>
              <Card className="pr-0 pl-3 border-0 mt-2">
                <Row>
                  <Col md="6" xs="12" lg="6">
                    {pathname === "/" ? (
                      <CardBody>
                        <LoginForm
                          onSubmit={handleLoginSubmit}
                          formLoading={isLoggingIn}
                        />
                        <Delimeter />
                        <Button
                          className="btn-block"
                          color="info"
                          onClick={() => setLoginView(prev => !prev)}
                        >
                          CLICK HERE TO REGISTER
                        </Button>
                      </CardBody>
                    ) : (
                      <CardBody>
                        <RegisterForm
                          onSubmit={handleRegisterSubmit}
                          formLoading={isRegistring}
                        />
                      </CardBody>
                    )}
                  </Col>
                  <Col md="6" xs="12" lg="6" className="pl-0">
                    <CardBody className="bg-info py-0 mb-0">
                      <p className="text-light mb-0 pt-2 font-weight-bold">
                        A LIGHT WEIGHT TODO APP
                      </p>
                      <Hero />
                    </CardBody>
                  </Col>
                </Row>
              </Card>
            </StyledForm>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

Auth.propTypes = propTypes;
Auth.defaultProps = defaultProps;

const stateProps = state => ({
  isLoggingIn: state.ui.loading["login"],
  isRegistring: state.ui.loading["register"],
  loginError: state.ui.errors["login"],
  registerError: state.ui.errors["register"]
});
const dispatchProps = {
  login,
  register,
  navigateTo
};

export default connect(stateProps, dispatchProps)(Auth);
