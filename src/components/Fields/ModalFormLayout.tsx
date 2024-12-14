import styled from "styled-components";
import { useEffect } from "react";
import ArrowLineRight from "/icons/ArrowLineRightGreen.svg";

type ModalFormLayoutType = {
  children: React.ReactNode;
  setOpen: (arg: boolean) => void;
  heading: string;
  headIcon?: string;
  number?: string;
  setSelectedViewRow?: (arg: number | null) => void | undefined;
  closeIconNotShow?: boolean;
  position?: string;
  padding?: string;
  subModal?: boolean;
  headingColor?: string;
};

const ModalFormLayOut = ({
  children,
  setOpen,
  heading,
  number = "",
  headIcon,
  setSelectedViewRow,
  closeIconNotShow = false,
  position = "center",
  padding = "1rem 1.5rem 2rem",
  subModal = false,
  headingColor = "#27736e",
}: ModalFormLayoutType) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (setSelectedViewRow) {
          setSelectedViewRow(null);
        }
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Wrapper
      $headingColor={headingColor}
      $position={position}
      $padding={padding}
    >
      <div className="form-header flex">
        <span className="flex">
          {headIcon && <img src={headIcon} alt="Icon" className="icon" />}
          <h3>{heading}</h3>
          <h3 style={{ color: "#8F5256" }}>{number}</h3>
        </span>
        {!closeIconNotShow && (
          <img
            className="close"
            src={subModal ? ArrowLineRight : ""}
            alt="Close"
            onClick={() => {
              if (setSelectedViewRow) {
                setSelectedViewRow(null);
              }
              setOpen(false);
            }}
          />
        )}
      </div>
      {children}
    </Wrapper>
  );
};

export default ModalFormLayOut;

const Wrapper = styled.div<{
  $position: string;
  $padding: string;
  $headingColor: string;
}>`
  padding: ${({ $padding }) => $padding};
  background: #fff;
  border-radius: ${({ $position }) =>
    $position === "center" ? "0.25rem" : "1rem"};
  max-width: ${({ $position }) => ($position === "center" ? "90%" : "100%")};
  position: relative;
  z-index: 1;
  .form-header {
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 2px solid #d9dee0;
    margin-bottom: 1.5rem;
  }
  .close {
    cursor: pointer;
  }
  span {
    gap: 0.6rem;
    img {
      width: 1.5rem;
      height: 1.5rem;
    }
    h3 {
      font-size: 1rem;
      color: ${({ $headingColor }) => $headingColor};
    }
  }
  .close {
    cursor: pointer;
  }
`;
