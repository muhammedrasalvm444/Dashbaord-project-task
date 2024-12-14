import React from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...buttonStyle[variant],
        ...(disabled && buttonStyle.disabled),
      }}
    >
      {label}
    </button>
  );
};

export default Button;
const buttonStyle = {
  primary: {
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    fontSize: "16px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  secondary: {
    backgroundColor: "#6C757D",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    fontSize: "16px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  disabled: {
    backgroundColor: "#cccccc",
    color: "#666666",
    cursor: "not-allowed",
  },
};
