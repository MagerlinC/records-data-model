import React from "react";
import AnimateOnChange from "./AnimateOnChange";

type RemovableElementProps = {
  name: string;
  onRemove: () => void;
};
const RemovableElement: React.FC<RemovableElementProps> = ({
  name,
  onRemove,
}) => {
  return (
    <AnimateOnChange>
      {name}{" "}
      <span className={"remove-item"} onClick={onRemove}>
        x
      </span>
    </AnimateOnChange>
  );
};
export default RemovableElement;
