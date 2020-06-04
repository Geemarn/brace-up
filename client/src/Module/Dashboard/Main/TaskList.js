import React, { useEffect, useState } from "react";
import { capIstLetterSentence } from "../../../utils";
import { connect } from "react-redux";
import { Button, Form } from "reactstrap";
import styled from "styled-components";

const StyledTaskList = styled.div`
  cursor: pointer;
  input {
    :focus {
      outline: none;
    }
  }
`;

const TaskList = props => {
  const {
    updateDone,
    description,
    taskId,
    formLoading,
    onEdit,
    onDelete
  } = props;

  useEffect(() => {
    if (updateDone) {
      updateDone(formLoading);
    }
  }, [formLoading, updateDone]);

  const [showChecker, setShowChecker] = useState(
    JSON.parse(localStorage.getItem(`checker-${taskId}`))
  );
  const [isEditing, setIsEditing] = useState(false);
  const [desc, setDesc] = useState(description);
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem(`checker-${taskId}`, JSON.stringify(showChecker));
  }, [showChecker, taskId]);

  const submitForm = e => {
    e.preventDefault();
    setError(null);
    setIsEditing(prev => !prev);
    const payload = {
      description: desc
    };
    if (description !== desc) {
      if (desc.length < 10) {
        setIsEditing(true);
        setError("value must be greater than 10 characters");
      } else {
        setShowChecker(false);
        setError(null);
        onEdit(payload, taskId);
      }
    }
  };

  const onValueChange = e => {
    e.preventDefault();
    setDesc(e.target.value);
  };

  const handleDelete = () => {
    onDelete(taskId);
    localStorage.removeItem(`checker-${taskId}`);
  };

  return (
    <StyledTaskList>
      {isEditing ? (
        <Form onSubmit={e => submitForm(e)}>
          <div className="p-0 m-0">
            <div className="d-flex justify-content-between shadow-sm mb-1">
              <input
                name={"description"}
                disabled={formLoading}
                value={desc}
                onChange={e => onValueChange(e)}
                className="w-100 pl-2 p-2 text-info background m-0 borderr"
              />
              <Button color="success" size="sm">
                Save
              </Button>
            </div>
            {error && (
              <small className="text-danger m-0 p-0 pl-2">{error}</small>
            )}
          </div>
        </Form>
      ) : (
        <div className="d-flex justify-content-between shadow-sm px-2 pt-2 pb-1 mb-1 text borderr">
          <span
            onClick={() => setShowChecker(prev => !prev)}
            className={`pr-2 ${showChecker ? "text-muted" : ""}`}
          >
            {showChecker ? (
              <i className="fas fa-check mr-2 text-success" />
            ) : (
              <small>
                <i className="far fa-circle mr-2 text-info" />
              </small>
            )}
            {capIstLetterSentence(description)}
          </span>
          <div>
            <Button
              color={!isEditing ? "info" : "success"}
              size="sm"
              onClick={prev => setIsEditing(true)}
            >
              Edit
            </Button>
            <span onClick={handleDelete}>
              <i className="fas fa-trash-alt text-danger pl-3" />
            </span>
          </div>
        </div>
      )}
    </StyledTaskList>
  );
};

const stateProps = state => {
  const todo = state.todo.current;
  return {
    todo,
    formData: state.form.TaskList
  };
};

const dispatchProps = {};

export default connect(stateProps, dispatchProps)(TaskList);
