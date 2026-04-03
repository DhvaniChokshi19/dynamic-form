import React from "react";
import "./Formfields.css"
export default function CheckboxField({ field, value, error, onChange }) {
  return (
    <div className="container">
      <label className="inlinelabels">
        <input
          id={field.name}
          type="checkbox"
          checked={value || false}
          onChange={(e) => onChange(field.name, e.target.checked)}
        />
        {field.label}{field.required && (
    <span style={{ color: "#e74c3c", marginLeft: "4px" }}>*</span>
  )}
      </label>
      {error && <p className="error" >{error}</p>}
    </div>
  );
}