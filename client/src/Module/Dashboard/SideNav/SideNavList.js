import React from "react";
import StyledSideNavList from "../../../_shared/styles/sideNavList";

const SideNavList = ({
  icon,
  text,
  dropDown = false,
  onClick,
  onClickStatus,
  borderBottom,
  openToggle,
  className
}) => {
  return (
    <StyledSideNavList
      borderBottom={borderBottom}
      z
      openToggle={openToggle}
      onClick={onClickStatus}
    >
      <div className={`${className}`}>
        <span>
          <i className={`i ${icon} mr-4  icon`} />
        </span>
        <span>{text}</span>
        {dropDown && (
          <span onClick={onClick}>
            <i className="i2 fa fa-caret-down float-right icon" />
          </span>
        )}
      </div>
    </StyledSideNavList>
  );
};

export default SideNavList;
