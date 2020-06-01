import React from "react";
import styled from "styled-components";

const DropdownItemContainer = styled.div`
  max-height: 180px;
  overflow-y: auto;

  /* width */
  ::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #17a2b8;
    border-radius: 2px;
  }
`;

export default DropdownItemContainer;
