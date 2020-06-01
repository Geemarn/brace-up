import React from "react";
import styled from "styled-components";
import { ReactComponent as Delimeter } from "../../../_shared/assets/Delimeter.svg";

const Container = styled.div`
  svg {
    width: 70%;
    margin: 10px 55px;
  }
`;

export default () => {
  return (
    <Container>
      <Delimeter />
    </Container>
  );
};
