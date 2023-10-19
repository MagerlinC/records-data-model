import React, { useState } from "react";
import styled from "styled-components";

const AddButtonWrapper = styled.button`
  border: none;
  border-radius: 4px;
  padding: 2px 4px;
  background-color: #673ab7;
  text-align: center;
  font-size: 0.8em;
  font-weight: lighter;
  &:hover {
    outline: 1px solid white;
  }
`;

const StyledInput = styled.input`
  padding: 4px;
  border-radius: 6px;
`;

type AddDataSubjectButtonProps = {
  text: string;
  onAddItem: (value: string) => void;
};
const AddButton: React.FC<AddDataSubjectButtonProps> = ({
  text,
  onAddItem,
}) => {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const submitOnKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setShowInput(false);
      setInputValue("");
    }
    if (e.key === "Enter") {
      setShowInput(false);
      onAddItem(inputValue);
      setInputValue("");
    }
  };

  return showInput ? (
    <StyledInput
      autoFocus={true}
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={(e) => submitOnKeyDown(e)}
    />
  ) : (
    <AddButtonWrapper onClick={() => setShowInput(!showInput)}>
      + {text}
    </AddButtonWrapper>
  );
};
export default AddButton;
