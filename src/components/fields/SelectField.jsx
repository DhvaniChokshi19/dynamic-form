import React from "react";
import "./Formfields.css"

export default function SelectField({ field, value, error, onChange }) {
  const options = field.options?.map((opt) =>
    typeof opt === "string" ? { label: opt, value: opt } : opt,
  );

  return (
    <div>
      <label>{field.label}</label>
      <select
        id={field.name}
        value={value || ""}
        onChange={(e) => onChange(field.name, e.target.value)}
      >
        <option value="">Select...</option>
        {options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
