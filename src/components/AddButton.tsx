import React, { useState } from "react";
import styled from "styled-components";

const AddButtonWrapper = styled.button`
  border: none;
  border-radius: 6px;
  padding: 6px 8px;
  background-color: #673ab7;
  font-size: 0.8em;
`;
type AddDataSubjectButtonProps = {
  onAddItem: (value: string) => void;
};
const AddButton: React.FC<AddDataSubjectButtonProps> = ({ onAddItem }) => {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const submitOnKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setShowInput(false);
      onAddItem(inputValue);
    }
  };

  return showInput ? (
    <input
      autoFocus={true}
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={(e) => submitOnKeyDown(e)}
    />
  ) : (
    <AddButtonWrapper onClick={() => setShowInput(!showInput)}>
      + Add
    </AddButtonWrapper>
  );
};
export default AddButton;
