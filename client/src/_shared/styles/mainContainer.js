import styled from "styled-components";

const StyledMain = styled.div`
  padding: 0px 30px 10px 20px;
  min-height: 100vh;
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
