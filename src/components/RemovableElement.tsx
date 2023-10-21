import React, { useState } from "react";
import AnimateOnChange from "./AnimateOnChange";
import styled, { css } from "styled-components";

const HideableSpan = styled.span<{ isHidden: boolean }>`
  ${({ isHidden }) => css`
    text-decoration: ${isHidden ? "line-through" : "none"};
    opacity: ${isHidden ? 0.4 : 1};
    cursor: pointer;
  `}
`;

type RemovableElementProps = {
  name: string;
  onRemove: () => void;
};
const RemovableElement: React.FC<RemovableElementProps> = ({
  name,
  onRemove,
}) => {
  const [hidden, setHidden] = useState(false);
  return (
    <AnimateOnChange>
      <HideableSpan isHidden={hidden} onClick={() => setHidden(!hidden)}>
        {name}{" "}
      </HideableSpan>
      <span onClick={onRemove} className={"remove-item"}>
        x
      </span>
    </AnimateOnChange>
  );
};
export default RemovableElement;
