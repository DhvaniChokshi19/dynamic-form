import { isFieldVisible } from "./visibility.js";

const validators = {
  required: (val, field) => {
    if (field.type === "checkbox") {
      return !val ? "This field is required." : "";
    }
    return !val || String(val).trim() === ""
      ? "This field is required."
      : "";
  },

  email: (val) => {
    if (!val) return "";
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
      ? ""
      : "Enter a valid email address.";
  },

  tel: (val) => {
    if (!val) return "";
    return /^[0-9]{10}$/.test(val)
      ? ""
      : "Phone number must be exactly 10 digits.";
  },
  password: (val) => {
    if (!val) return "";
    return val.length >= 6
      ? ""
      : "Password must be at least 6 characters.";
  },
  number: (val, field) => {
    if (!val) return "";
    const n = Number(val);
    if (field.min !== undefined && n < field.min)
      return `Minimum value is ${field.min}.`;
    if (field.max !== undefined && n > field.max)
      return `Maximum value is ${field.max}.`;
    return "";
  },

  date: (val) => {
    if (!val) return "";
    const selected = new Date(val);
    const today = new Date();
    return selected > today ? "Future dates are not allowed." : "";
  },
};
export function validateForm(fields, values) {
  const errors = {};

  for (const field of fields) {
    const key = field.name;

    if (!isFieldVisible(field, values)) continue;

    const val = values[key];

    
    if (field.required) {
      const err = validators.required(val, field);
      if (err) {
        errors[key] = err;
        continue;
      }
    }

    const validateFn = validators[field.type];
    if (validateFn) {
      const err = validateFn(val, field);
      if (err) errors[key] = err;
    }
  }

  const dob = values["dob"];
  const age = values["age"];

  if (dob && age) {
    const birthYear = new Date(dob).getFullYear();
    const currentYear = new Date().getFullYear();
    const calculatedAge = currentYear - birthYear;

    if (calculatedAge !== Number(age)) {
      errors["age"] = "Age does not match DOB.";
    }
  }

  return errors;
}