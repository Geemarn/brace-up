import styled from "styled-components";

const StyledDropDownItem = styled.div`
  display: block;
  font-size: 18px;
  color: ${props => (props.current ? "#fff" : props.theme.color)};
  background-color: ${props => (props.current ? props.theme.bgColor2 : "")};
  padding: 6px 12px 6px 6px;
  text-decoration: none;
  border: ${props => (props.current ? props.theme.sideBorder2 : "")};
  cursor: pointer;
  .i {
    font-size: 14 px;
    padding-top: 2px;
  }
`;

export default StyledDropDownItem;
