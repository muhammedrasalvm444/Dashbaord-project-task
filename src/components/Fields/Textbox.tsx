import React from "react";

interface TextBoxProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width?: string;
  name?: string;
  required?: boolean;
  type?: string;
}

const TextBox: React.FC<TextBoxProps> = ({
  label,
  placeholder,
  value,
  onChange,
  width = "15rem",
  name,
  required = false,
  type = "text",
}) => {
  return (
    <div
      style={{
        display: "flex",
        marginBottom: "16px",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      {label && (
        <label
          style={{
            marginRight: "10px",
            fontSize: "10px",
            color: "#888",
            minWidth: "100px", // Set a fixed width for the label if necessary
          }}
        >
          {label}
        </label>
      )}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        style={{
          flex: 1,
          padding: "8px",
          fontSize: "12px",
          border: "1px solid #ccc",
          borderRadius: "8px", // Slightly round corners
          outline: "none",
          backgroundColor: "transparent",
          width: width,
        }}
      />
    </div>
  );
};

export default TextBox;
