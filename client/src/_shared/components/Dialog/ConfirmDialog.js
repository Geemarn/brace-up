import React from "react";
import { Button } from "reactstrap";
import { Modal } from "react-bootstrap";
import Progress from "../Progress/index";
import "./index.css";

const ConfirmDialog = props => {
  const {
    loading,
    confirmButtonText = "Yes",
    cancelButtonText = "No",
    message,
    showDialog,
    handleConfirm,
    handleClose,
    onHide,
    nightMode
  } = props;

  return (
    <div>
      <Modal
        show={showDialog}
        onHide={onHide}
        animation={false}
        className={`${nightMode ? "my-modal" : null}`}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="fas fa-exclamation text-danger pr-2" />
            Delete Confirmation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message ? message : "Are you sure you want to perform this function"}
        </Modal.Body>
        <Modal.Footer>
          <Button color="info" variant="secondary" onClick={handleConfirm}>
            {loading ? <Progress /> : confirmButtonText}
          </Button>
          <Button color="secondary" variant="info" onClick={handleClose}>
            {cancelButtonText}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ConfirmDialog;
