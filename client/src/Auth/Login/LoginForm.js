import React, { useState } from "react";
import { Field, reduxForm, getFormValues } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Col,
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import InputField from "../../_shared/components/ReduxFormFields/TextInput/index";
import Progress from "../../_shared/components/Progress/index";

const LoginForm = props => {
  const [viewPassword, setViewPassword] = useState(false);
  const { handleSubmit, formLoading, submitting, fields } = props;
  const validateFields = !fields || !fields.username || !fields.password;

  return (
    <Form onSubmit={handleSubmit}>
      <span>
        <span className="h3 font-italic text-info">Brace </span>
        <span className="h1 text-success ">UP</span>
        <small className=" font-weight-bold text-muted">
          ...make your work easy
        </small>
      </span>
      <p className="text-muted">Sign In to your account</p>
      <InputGroup className="mb-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText className="bg-white text-info border-top-0 border-right-0 border-left-0 border-info rounded-0">
            <i className="fas fa-user" />
          </InputGroupText>
        </InputGroupAddon>
        <Field
          name="username"
          type="text"
          disabled={formLoading}
          component={InputField}
          placeholder="enter username"
        />
      </InputGroup>
      <InputGroup className="mb-4">
        <InputGroupAddon addonType="prepend">
          <InputGroupText className="bg-white text-info border-top-0 border-right-0 border-left-0 border-info rounded-0">
            <i className="fas fa-lock" />
          </InputGroupText>
        </InputGroupAddon>
        <Field
          name="password"
          type={`${viewPassword ? "text" : "password"}`}
          disabled={formLoading}
          component={InputField}
          placeholder="Your Password"
        />
        <InputGroupAddon addonType="prepend">
          <InputGroupText
            onClick={() => setViewPassword(!viewPassword)}
            className="bg-white text-info border-top-0 border-right-0 border-left-0 border-info rounded-0"
          >
            <i className={`fa fa-${viewPassword ? "eye-slash" : "eye"}`} />
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <Row>
        <Col xs="6">
          <Button
            color="info"
            disabled={formLoading || submitting || validateFields}
            className="px-4 btn-block mb-2"
          >
            {formLoading ? <Progress /> : "Login"}
          </Button>
        </Col>
        <Col xs="6" className="text-right">
          <Link to={"/resetPassword"} className="px-0 text-info">
            Forgot password?
          </Link>
        </Col>
      </Row>
    </Form>
  );
};

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = "Please enter your username";
  }
  if (!values.password) {
    errors.password = "Please enter your password";
  } else if (values.password.length < 6) {
    errors.password = "Password should be 6+ characters";
  }
  return errors;
};

const connectedForm = reduxForm({
  // a unique name for the form
  form: "LoginForm",
  validate
})(LoginForm);

export default connect(
  state => ({
    fields: getFormValues("LoginForm")(state)
  }),
  {}
)(connectedForm);
