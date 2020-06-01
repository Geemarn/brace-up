import React from "react";
import styled from "styled-components";
import { ReactComponent as Cry } from "../../../_shared/assets/cry-todo-1.svg";

const Container = styled.div`
  svg {
    height: 380px;
    margin-top: 50px;
    color: yellow;
  }
`;

export default () => {
  return (
    <Container>
      <Cry />
    </Container>
  );
};
