import React from "react";
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

const RegisternForm = props => {
  const { handleSubmit, formLoading, submitting, fields } = props;
  const validateFields =
    !fields ||
    !fields.username ||
    !fields.email ||
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(fields.email) ||
    !fields.password ||
    !fields.password2 ||
    fields.password.length < 6 ||
    fields.password2.length < 6 ||
    fields.password !== fields.password2;

  return (
    <Form onSubmit={handleSubmit}>
      <span>
        <span className="h4 font-italic text-info">Brace </span>
        <span className="h2 text-success ">UP</span>
        <small className=" font-weight-bold text-muted">
          ...make your work easy
        </small>
      </span>
      <p className="text-muted">Create an account in 10 seconds</p>
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
          placeholder="example"
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText className="bg-white text-info border-top-0 border-right-0 border-left-0 border-info rounded-0">
            <i className="fas fa-envelope" />
          </InputGroupText>
        </InputGroupAddon>
        <Field
          name="email"
          type="email"
          disabled={formLoading}
          component={InputField}
          placeholder="name@example.com"
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
          type="password"
          disabled={formLoading}
          component={InputField}
          placeholder="Choose a password"
        />
      </InputGroup>
      <InputGroup className="mb-4">
        <InputGroupAddon addonType="prepend">
          <InputGroupText className="bg-white text-info border-top-0 border-right-0 border-left-0 border-info rounded-0">
            <i className="fas fa-lock" />
          </InputGroupText>
        </InputGroupAddon>
        <Field
          name="password2"
          type="password"
          disabled={formLoading}
          component={InputField}
          placeholder="Confirm password"
        />
      </InputGroup>
      <Row>
        <Col xs="6">
          <Button
            color="info"
            disabled={formLoading || submitting || validateFields}
            className="px-4 btn-block"
          >
            {formLoading ? <Progress /> : "Register"}
          </Button>
        </Col>
        <Col xs="6" className="text-right">
          <Link to={"/"} className="px-0 text-info font-weight-bold">
            Back to Login
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
  if (!values.email) {
    errors.email = "Please enter your email";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Please enter your password";
  } else if (values.password.length < 6) {
    errors.password = "Password should be 6+ characters";
  }
  if (!values.password2) {
    errors.password2 = "Please comfirm your password";
  } else if (values.password2.length < 6) {
    errors.password2 = "Password should be 6+ characters";
  } else if (values.password !== values.password2) {
    errors.password2 = "passwords do not match";
  }
  return errors;
};

const connectedForm = reduxForm({
  // a unique name for the form
  form: "RegisternForm",
  validate
})(RegisternForm);

export default connect(
  state => ({
    fields: getFormValues("RegisternForm")(state)
  }),
  {}
)(connectedForm);
