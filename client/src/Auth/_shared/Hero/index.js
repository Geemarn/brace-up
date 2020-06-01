import React from "react";
import styled from "styled-components";
import { ReactComponent as Hero } from "../../../_shared/assets/Hero.svg";

const Container = styled.div`
  svg {
    top: 10px;
    height: 347px;
    width: 100%;
  }
`;

export default () => {
  return (
    <Container>
      <Hero />
    </Container>
  );
};
