import React from "react";
import TextField from "./fields/TextField";
import CheckboxField from "./fields/CheckboxField";
import RadioField from "./fields/RadioField";
import SelectField from "./fields/SelectField";
import FileField from "./fields/FileField";

const fieldMap = {
  text: TextField,
  email: TextField,
  number: TextField,
  password: TextField,
  radio: RadioField,
  textarea: TextField,
  tel: TextField,
  date: TextField,
  checkbox: CheckboxField,
  select: SelectField,
  file: FileField,
};

export default function DynamicField({ field, value, error, onChange }) {
  const Component = fieldMap[field.type];

  if (!Component) {
    console.warn(`Unsupported field type: ${field.type}`);
    return null;
  }

  return (
    <Component
      field={field}
      value={value}
      error={error}
      onChange={onChange}
    />
  );
}