import React from "react";
import "./Formfields.css"

export default function RadioField({ field, value, error, onChange }) {
  const options = field.options?.map((opt) =>
    typeof opt === "string" ? { label: opt, value: opt } : opt,
  );

  return (
    <div>
      <label style={{ display: "block", marginBottom: "6px" }}>
        {field.label}
      </label>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {options?.map((opt) => (
          <label
            key={opt.value}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              fontSize: "14px",
              color: "black",
              fontFamily: "'Lora', serif",
            }}
          >
            <input
              type="radio"
              name={field.name}
              value={opt.value}
              checked={value === opt.value}
              onChange={(e) => onChange(field.name, e.target.value)}
              style={{
                accentColor: "#8b7355",
                width: "16px",
                height: "16px",
              }}
            />
            {opt.label}
          </label>
        ))}
      </div>

      {error && <p className="error">{error}</p>}
    </div>
  );
}
