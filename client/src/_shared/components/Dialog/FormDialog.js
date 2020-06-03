import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const FormDialog = props => {
  const {
    title,
    size,
    showDialog,
    handleClose,
    formProps,
    titleBadgeColor,
    FormComponent,
    nightMode
  } = props;

  return (
    <div>
      <Modal
        autoFocus={true}
        backdrop="static"
        size={size}
        isOpen={showDialog}
        toggle={handleClose}
        fade={false}
        className={`view ${nightMode ? "my-modal" : null}`}
      >
        <ModalHeader toggle={handleClose}>
          <span
            className={`badge badge-${titleBadgeColor} badge-pill py-2 px-3`}
          >
            {title}
          </span>
        </ModalHeader>
        <ModalBody>
          <FormComponent {...formProps} />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default FormDialog;
