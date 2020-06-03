import React, { useEffect } from "react";
import { Button, Col, Form, FormGroup, Row } from "reactstrap";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import TextInputField from "../../../_shared/components/ReduxFormFields/TextInput";
import TextareaField from "../../../_shared/components/ReduxFormFields/TextareaField";
import Progress from "../../../_shared/components/Progress";

const propTypes = {
  formloading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired
};
const defaultProps = {
  formloading: false
};

const TodoFormDialog = props => {
  const {
    updateDone,
    nightMode,
    handleSubmit,
    formLoading,
    submitting,
    pristine,
    invalid
  } = props;

  useEffect(() => {
    if (updateDone) {
      updateDone(formLoading);
    }
  }, [formLoading, updateDone]);

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md="12" lg="12">
          <FormGroup>
            <Field
              name={"title"}
              disabled={formLoading}
              className={`form-control ${
                nightMode ? "bg-dark text-light" : null
              }`}
              placeholder="Title"
              component={TextInputField}
            />
          </FormGroup>
        </Col>
        <Col md="12" lg="12">
          <FormGroup>
            <Field
              name={"description"}
              disabled={formLoading}
              className={`form-control border-info ${
                nightMode ? "bg-dark text-light" : null
              }`}
              placeholder="Description"
              component={TextareaField}
            />
          </FormGroup>
        </Col>
        <Col md="12">
          <Button
            color="info"
            size="lg"
            className="mt-1 py-2 btn-block"
            disabled={invalid || formLoading || pristine || submitting}
          >
            {formLoading ? <Progress /> : "Create"}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
TodoFormDialog.propTypes = propTypes;
TodoFormDialog.defaultProps = defaultProps;

const validate = value => {
  const errors = {};
  if (!value.title) {
    errors.title = "This field can not be left blank";
  }
  if (!value.description) {
    errors.description = "This field can not be left blank";
  } else if (value.description.length < 20) {
    errors.description = "Description should have at least 20 characters";
  }
  console.log("errors:::::", errors);
  return errors;
};

const connectedForm = reduxForm({
  form: "TodoFormDialog",
  enableReinitialize: true,
  validate
  // @ts-ignore
})(TodoFormDialog);

export default connectedForm;
