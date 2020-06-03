import styled from "styled-components";

const StyledMain = styled.div`
  padding: 0px 30px 0 20px;
  height: 100vh;
  background-color: ${props => props.theme.bgColor};
  .text {
    color: ${props => props.theme.color};
  }
  .borderr {
    border: ${props => props.theme.border};
  }
  .background {
    background-color: ${props => props.theme.bgColor};
  }
`;

export default StyledMain;
