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

  /* On smaller screens, where height is less than 450px, change the style of the sidebar (less padding and a smaller font size) */
  @media only screen and (max-width: 450px) {
    padding-top: 15px;
    font-size: 10px;
    width: 180px;
  }
`;

export default StyledSideNav;
