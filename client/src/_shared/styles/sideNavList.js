import styled from "styled-components";

const StyledSideNavList = styled.div`
  display: block;
  font-size: 18px;
  color: #fff;
  padding: 6px 20px;
  text-decoration: none;
  border-bottom: ${props =>
    props.borderBottom && !props.openToggle ? props.theme.sideBorder2 : null};
  cursor: pointer;
  .i {
    font-size: 18px;
  }
`;

export default StyledSideNavList;
