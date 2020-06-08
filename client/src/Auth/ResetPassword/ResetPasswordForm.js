import React from "react";
import { Field, reduxForm, getFormValues } from "redux-form";
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
import { connect } from "react-redux";

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = "Please enter your email";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  return errors;
};

const ResetPasswordForm = props => {
  const { handleSubmit, submitting, formLoading, fields } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Reset Password</h1>
      <p className="text-muted">Reset your password with your email</p>
      <InputGroup className="mb-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText className="bg-white text-info border-top-0 border-right-0 border-left-0 border-info rounded-0">
            <i className="fas fa-lock" />
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
      <Row>
        <Col xs="12">
          <Button
            color="info"
            disabled={formLoading || submitting}
            className="px-4 btn-envelope"
          >
            {formLoading ? <Progress /> : "Reset"}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

const connectForm = reduxForm({
  // a unique name for the form
  form: "resetForm",
  validate
})(ResetPasswordForm);
export default connect(
  state => ({
    fields: getFormValues("rresetForm")(state)
  }),
  {}
)(connectForm);
