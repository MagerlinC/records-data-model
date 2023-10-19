import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
const ModalWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContents = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  color: black;
  padding: 12px;
  border-radius: 8px;
  max-width: 50vw;
`;

type ModalProps = {
  children: React.ReactNode;
};
const Modal: React.FC<ModalProps> = ({ children }) => {
  const content = (
    <ModalWrapper>
      <ModalContents>{children}</ModalContents>
    </ModalWrapper>
  );

  return ReactDOM.createPortal(content, document.body);
};
export default Modal;
