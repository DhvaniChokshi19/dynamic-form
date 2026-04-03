import React from "react";
import useFormState from './hooks/useFormState.js';
import { useEffect, useCallback } from "react";
import { validateForm } from "./utils/validation.js";
import { isFieldVisible } from "./utils/visibility.js";
import  DynamicField from "./components/DynamicField.jsx";
import FORM_CONFIG from "./form-config.json";

const STORAGE_KEY = "dynamic_form_data_v1";

export default function FormRenderer() {
  const { state, dispatch } = useFormState();

  
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ values: state.values })
      );
    } catch (_) {}
  }, [state.values]);

  const handleChange = useCallback((id, value) => {
    dispatch({ type: "SET_FIELD", name: id, value });
  }, []);

 const handleSubmit = () => {
    const errors = validateForm(FORM_CONFIG.fields, state.values);
    if (Object.keys(errors).length > 0) {
      dispatch({ type: "SET_ERRORS", errors });
      const firstId = Object.keys(errors)[0];
      document.getElementById(firstId)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    dispatch({ type: "SET_SUBMITTED", value: true });
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    dispatch({ type: "RESET" });
  };

  const visibleFields = FORM_CONFIG.fields.filter((f) =>
    isFieldVisible(f, state.values)
  );

return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=DM+Mono:wght@400;500&family=Playfair+Display:wght@700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f5f0e8; min-height: 100vh; }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        .field-enter {
          animation: slideIn 0.3s ease forwards;
        }
        .submit-btn:hover { background: #6b5840 !important; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(139,115,85,0.35) !important; }
        .submit-btn:active { transform: translateY(0); }
        .reset-btn:hover { background: #e8e0d2 !important; }
      `}</style>
 
      <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #f5f0e8 0%, #ede5d4 100%)", padding: "48px 16px", fontFamily: "'Lora', serif" }}>
 
        <div style={{ maxWidth: "640px", margin: "0 auto 32px", animation: "slideIn 0.5s ease" }}>
          <div style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#a8956e", fontFamily: "'DM Mono', monospace", marginBottom: "10px" }}>
            Dynamic Form Engine
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 5vw, 38px)", color: "#1a1208", lineHeight: "1.2", marginBottom: "8px" }}>
            {FORM_CONFIG.title}
          </h1>
          <p style={{ color: "#7a6a52", fontSize: "15px", lineHeight: "1.6" }}>{FORM_CONFIG.description}</p>
        </div>
 
        {!state.submitted ? (
          <div style={{ maxWidth: "640px", margin: "0 auto", background: "#fefcf8", borderRadius: "16px", border: "1px solid #e0d5c0", boxShadow: "0 8px 40px rgba(100,80,40,0.08), 0 1px 3px rgba(0,0,0,0.04)", overflow: "hidden" }}>
 
            <div style={{ height: "4px", background: "linear-gradient(90deg, #8b7355, #c4a882, #8b7355)" }} />
 
            <div style={{ padding: "clamp(24px, 5vw, 40px)", display: "flex", flexDirection: "column", gap: "28px" }}>
 
              {visibleFields.map((field, i) => (
                <div
                  key={field.name}
                  className="field-enter"
                  style={{ animationDelay: `${i * 0.04}s` }}
                >
                  {i > 0 && <div style={{ height: "1px", background: "#ede5d4", marginBottom: "28px" }} />}
                  <DynamicField
                    field={field}
                    value={state.values[field.name]}
                    error={state.errors[field.name]}
                    onChange={handleChange}
                  />
                </div>
              ))}
 
              <div style={{ display: "flex", gap: "12px", paddingTop: "8px", flexWrap: "wrap" }}>
                <button
                  className="submit-btn"
                  onClick={handleSubmit}
                  style={{ flex: "1", minWidth: "160px", padding: "14px 28px", background: "#8b7355", color: "#fefcf8", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'DM Mono', monospace", cursor: "pointer", transition: "all 0.2s ease", boxShadow: "0 3px 12px rgba(139,115,85,0.25)" }}
                >
                  Submit Form 
                </button>
                <button
                  className="reset-btn"
                  onClick={handleReset}
                  style={{ padding: "14px 20px", background: "#ede5d4", color: "#7a6a52", border: "none", borderRadius: "8px", fontSize: "13px", fontFamily: "'DM Mono', monospace", cursor: "pointer", transition: "background 0.2s ease" }}
                >
                  Reset
                </button>
              </div>

            </div>
          </div>
        ) : (
        
          <div style={{ maxWidth: "640px", margin: "0 auto", background: "#fefcf8", borderRadius: "16px", border: "1px solid #e0d5c0", boxShadow: "0 8px 40px rgba(100,80,40,0.08)", overflow: "hidden", animation: "fadeIn 0.5s ease" }}>
            <div style={{ height: "4px", background: "linear-gradient(90deg, #27ae60, #52c97a)" }} />
            <div style={{ padding: "clamp(32px, 5vw, 48px)", textAlign: "center" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>✓</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", color: "#1a1208", marginBottom: "10px" }}>
                Form Submitted!
              </h2>
              <p style={{ color: "#7a6a52", marginBottom: "32px", lineHeight: "1.6" }}>
                Here's a summary of the data captured from the form.
              </p>
 
              <div style={{ background: "#f5f0e8", borderRadius: "10px", padding: "20px", textAlign: "left", marginBottom: "28px" }}>
                {FORM_CONFIG.fields.filter((f) => isFieldVisible(f, state.values)).map((f) => {
                  const v = state.values[f.name];
                  const display = 
                 f.type === "checkbox"
                 ? (v ? "Yes" : "No")
                 : f.type === "file"
                 ? (v ? v.name : "No file selected")
                 : f.type === "password"
                 ? (v ? "*".repeat(v.length) : "—")
                 : (v || "—");
                  return (
                    <div key={f.name} style={{ display: "flex", justifyContent: "space-between", gap: "16px", padding: "8px 0", borderBottom: "1px solid #e0d5c0", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "11px", fontFamily: "'DM Mono', monospace", color: "#8b7355", letterSpacing: "0.06em", textTransform: "uppercase" }}>{f.label}</span>
                      <span style={{ fontSize: "13px", color: "#2c2416", fontFamily: "'Lora', serif", fontWeight: "500" }}>{display}</span>
                    </div>
                  );
                })}
              </div>
 
              <button
                onClick={handleReset}
                className="submit-btn"
                style={{ padding: "14px 32px", background: "#8b7355", color: "#fefcf8", border: "none", borderRadius: "8px", fontSize: "13px", fontFamily: "'DM Mono', monospace", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s ease" }}
              >
                Start Over
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}