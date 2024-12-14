import React, { useState } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { IoClose } from "react-icons/io5";

interface CustomSelectProps {
  label: string;
  options: { value: string; label: string }[];
  isMulti?: boolean;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  width?: string;
  name?: string;
  required?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  isMulti = false,
  value,
  onChange,
  width = "13rem",
  required,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (selectedValue: string) => {
    if (isMulti) {
      // Multi-selection logic
      const newValue = Array.isArray(value) ? [...value] : [];
      if (newValue.includes(selectedValue)) {
        onChange(newValue.filter((v) => v !== selectedValue));
      } else {
        onChange([...newValue, selectedValue]);
      }
    } else {
      // Single selection logic
      onChange(selectedValue);
      setIsOpen(false); // Close dropdown after single selection
    }
  };

  const handleClear = () => {
    onChange(isMulti ? [] : ""); // Clear all selections
  };

  return (
    <div style={{ marginBottom: "16px", position: "relative", width: width }}>
      <label
        style={{
          display: "block",
          marginBottom: "8px",
          fontSize: "10px",
          color: "#888",
        }}
      >
        {label}
      </label>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: width,
          border: "1px solid #ccc",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        <div
          onClick={() => setIsOpen(!isOpen)}
          style={{
            flex: 1,
            padding: "8px",
            fontSize: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>
            {isMulti
              ? (value as string[]).join(", ") || "Select..."
              : options.find((opt) => opt.value === value)?.label ||
                "Select..."}
          </span>
          {!isOpen ? <MdArrowDropDown /> : <MdArrowDropUp />}
        </div>
        {/* Clear Icon */}
        {(isMulti ? (value as string[]).length > 0 : value) && (
          <IoClose
            onClick={handleClear}
            style={{
              cursor: "pointer",
              fontSize: "14px",
              color: "#ee0707 !important",
            }}
            title="Clear Selection"
          />
          // <p>dddd</p>
        )}
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <ul
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "4px",
            margin: 0,
            padding: "8px",
            listStyle: "none",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            zIndex: 10,
          }}
        >
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option.value)}
              style={{
                padding: "8px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                backgroundColor:
                  (isMulti &&
                    Array.isArray(value) &&
                    value.includes(option.value)) ||
                  value === option.value
                    ? "#f0f8ff"
                    : "transparent",
              }}
            >
              {/* Add Radio Buttons for Single Select */}
              {!isMulti ? (
                <input
                  type="radio"
                  name="singleSelect"
                  checked={value === option.value}
                  readOnly
                  style={{ marginRight: "8px" }}
                  required={required}
                />
              ) : (
                // Add Checkbox for Multi Select
                <input
                  type="checkbox"
                  checked={Array.isArray(value) && value.includes(option.value)}
                  readOnly
                  style={{ marginRight: "8px" }}
                  required={required}
                />
              )}
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
