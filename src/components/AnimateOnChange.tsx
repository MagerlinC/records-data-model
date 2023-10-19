import React from "react";
import styled, { keyframes } from "styled-components";

const animation = keyframes`
    0% {
        color: green;
    }
    100% {
        opacity: black;
    }
`;
const AnimateOnChantgeWrapper = styled.div`
  animation-name: ${animation};
  animation-duration: 4s;
`;

type AnimateOnChangeProps = {
  children: React.ReactNode;
};
const AnimateOnChange: React.FC<AnimateOnChangeProps> = ({ children }) => {
  return <AnimateOnChantgeWrapper>{children}</AnimateOnChantgeWrapper>;
};
export default AnimateOnChange;
