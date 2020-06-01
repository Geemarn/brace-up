import React from "react";
import StyledDropDownItem from "../../../_shared/styles/dropDownItem";

const DropdownItem = ({ text, current, onClick, onClickDelete }) => {
  const truncateText = text => {
    let newText = text;
    if (text.length > 13) {
      newText = text.substring(0, 13) + "...";
    }
    return newText;
  };

  return (
    <StyledDropDownItem current={current} onClick={onClick}>
      <div>
        <span>
          {current ? (
            <i className="far fa-dot-circle text-white mr-2" />
          ) : (
            <i className="far fa-circle text-white mr-2" />
          )}
        </span>
        <span>{truncateText(text)}</span>
        <span onClick={onClickDelete}>
          {current && <i className="i fa fa-times float-right text-danger" />}
        </span>
      </div>
    </StyledDropDownItem>
  );
};

export default DropdownItem;
