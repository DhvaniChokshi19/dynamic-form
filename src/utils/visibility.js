export function isFieldVisible(field, values) {
  if (!field.showIf) return true;
  const { field: depId, value: depVal } = field.showIf;
  return values[depId] === depVal;
}