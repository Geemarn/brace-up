import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, getFormValues } from "redux-form";
import {
  Button,
  Col,
  Form,
  Card,
  Container,
  CardGroup,
  Alert,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import { fetchUpdatePassword, updatePassword } from "../../redux/actions";
import InputField from "../../_shared/components/ReduxFormFields/TextInput/index";
import Progress from "../../_shared/components/Progress/index";

const UpdatePasswordForm = props => {
  const {
    submitting,
    isUpdatingPassword,
    match: { params },
    updatePassword,
    fetchResetError,
    formData,
    fields,
    fetchUpdatePassword
  } = props;

  const validateFields =
    !fields ||
    !fields.password ||
    !fields.password2 ||
    fields.password.length < 6 ||
    fields.password2.length < 6 ||
    fields.password !== fields.password2;

  const { token } = params;
  useEffect(() => {
    if (token) {
      fetchUpdatePassword(token);
    }
  }, [token, fetchUpdatePassword]);

  const handleSubmit = e => {
    e.preventDefault();
    let values = formData && formData.values;
    const payload = {
      password: values.password,
      password2: values.password2
    };

    updatePassword(payload, token);
  };

  return (
    <Form onSubmit={e => handleSubmit(e)}>
      <Container>
        <Row className="justify-content-center mt-5 pt-5">
          {fetchResetError && (
            <Alert className="bg-danger h5 text-white">{fetchResetError}</Alert>
          )}
          <Col md="6" xs="12" lg="6">
            <CardGroup>
              <Card className="p-5">
                <h2>Reset Password</h2>
                <InputGroup className="mb-4">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText className="bg-white text-info border-top-0 border-right-0 border-left-0 border-info rounded-0">
                      <i className="fas fa-lock" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Field
                    name="password"
                    type="password"
                    disabled={isUpdatingPassword}
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
                    disabled={isUpdatingPassword}
                    component={InputField}
                    placeholder="Confirm password"
                  />
                </InputGroup>
                <Row>
                  <Col xs="12">
                    <Button
                      color="info"
                      disabled={
                        isUpdatingPassword || submitting || validateFields
                      }
                      className="px-4 btn-block"
                    >
                      {isUpdatingPassword ? <Progress /> : "Reset"}
                    </Button>
                  </Col>
                </Row>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};

const validate = values => {
  const errors = {};
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
  form: "resetFormUpdate",
  validate
})(UpdatePasswordForm);

const stateProps = state => ({
  formData: state.form.resetFormUpdate,
  fields: getFormValues("resetFormUpdate")(state),
  fetchResetError: state.ui.errors["fetchUpdatePassword"],
  isUpdatingPassword: state.ui.loading["updatePassword"]
});

const dispatchProps = {
  fetchUpdatePassword,
  updatePassword
};
export default connect(stateProps, dispatchProps)(connectedForm);
