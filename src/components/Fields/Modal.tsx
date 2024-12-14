import { useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

type ModalWrapperProps = {
  children: React.ReactNode;
  isOpen: boolean;
  position?: "CENTER" | "LEFT" | "RIGHT";
};

const ModalWrapper = ({
  children,
  isOpen = false,
  position = "CENTER",
}: ModalWrapperProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  return isOpen
    ? createPortal(
        <Wrapper $position={position}>{children}</Wrapper>,
        document.body
      )
    : null;
};

export default ModalWrapper;

const Wrapper = styled.div<{
  $position: "CENTER" | "LEFT" | "RIGHT";
}>`
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(2.5px);
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  padding: 1rem;
  top: 0;
  right: 0;
  //z-index: 2000;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: ${({ $position }) =>
    $position === "LEFT"
      ? "flex-start"
      : $position === "RIGHT"
      ? "flex-end"
      : "center"};
  transition: all 0.4s ease-in-out;

  @keyframes slideIn {
    from {
      transform: translateX(50%);
    }
    to {
      transform: translateX(0);
    }
  }
`;
