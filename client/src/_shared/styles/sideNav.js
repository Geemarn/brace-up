import styled from "styled-components";

const StyledSideNav = styled.div`
  height: 100%;
  width: 240px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: ${props => props.theme.sideBgColor};
  border-right: ${props => props.theme.sideBorder};
  overflow-x: hidden;
  padding-top: 20px;

  .icon {
    color: ${props => props.theme.iconColor};
  }
`;

export default StyledSideNav;
