import React from "react";
import "./Formfields.css"

export default function FileField({ field, value, error, onChange }) {
  return (
    <div className="container">
      <label>{field.label}</label>
      <input
        id={field.name}
        type="file"
        onChange={(e) => onChange(field.name, e.target.files[0])}
      />

      {value && (
        <p className="filename" style={{ fontSize: "12px" }}>
          Selected: {value.name}
        </p>
      )}

      {error && <p className="error" >{error}</p>}
    </div>
  );
}