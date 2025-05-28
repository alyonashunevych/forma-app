import { useEffect, useRef } from "react";
import Choices from "choices.js";
import "./ChoicesSelect.scss";

export function ChoicesSelect({
  options,
  value,
  onChange,
  name,
  disabled,
  required,
  placeholder,
}) {
  const selectRef = useRef(null);
  const choicesInstance = useRef(null);

  useEffect(() => {
    if (selectRef.current) {
      if (choicesInstance.current) {
        choicesInstance.current.destroy();
      }
      choicesInstance.current = new Choices(selectRef.current, {
        searchEnabled: false,
        itemSelectText: "",
        shouldSort: false,
        placeholder: !!placeholder,
        placeholderValue: placeholder,
      });
    }
    return () => {
      if (choicesInstance.current) {
        choicesInstance.current.destroy();
      }
    };
  }, [options, disabled, placeholder]);

  // Синхронізуємо value вручну, бо Choices не завжди це робить
  useEffect(() => {
    if (selectRef.current && value !== undefined) {
      selectRef.current.value = value;
    }
  }, [value]);

  return (
    <select
      ref={selectRef}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
