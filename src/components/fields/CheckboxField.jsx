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
        {field.label}
      </label>
      {error && <p className="error" >{error}</p>}
    </div>
  );
}