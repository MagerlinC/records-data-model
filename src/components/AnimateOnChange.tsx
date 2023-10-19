import React from "react";
import styled, { keyframes } from "styled-components";

const animation = keyframes`
    0% {
        color: green;
        text-decoration: underline;
    }
    100% {
        color: black;
        text-decoration: none;
    }
`;
const AnimateOnChangeWrapper = styled.div`
  animation-name: ${animation};
  animation-duration: 4s;
`;

type AnimateOnChangeProps = {
  children: React.ReactNode;
};
const AnimateOnChange: React.FC<AnimateOnChangeProps> = ({ children }) => {
  return <AnimateOnChangeWrapper>{children}</AnimateOnChangeWrapper>;
};
export default AnimateOnChange;
