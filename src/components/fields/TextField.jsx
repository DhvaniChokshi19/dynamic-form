import React from "react";
import "./Formfields.css"
export default function TextField({ field, value, error, onChange }) {
  return (
    <div className="container">
      <label>{field.label} {field.required && (
    <span style={{ color: "#e74c3c", marginLeft: "4px" }}>*</span>
  )}</label>

      <input
        id={field.name}
        type={field.type} 
        placeholder={field.placeholder}
        value={value || ""}
        min={field.min}
        max={field.max}
        onChange={(e) => onChange(field.name, e.target.value)}
      />

      {error && <p className="error">{error}</p>}
    </div>
  );
}