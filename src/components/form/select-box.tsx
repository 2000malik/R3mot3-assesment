import React, { ChangeEvent } from "react";

type Props = {
  placeholder?: string;
  items: { value: string; label: string }[];
  value: string;
  disabled?: boolean;
  onChange: (evt: ChangeEvent<HTMLSelectElement>) => void;
};

export const SelectBox: React.FC<Props> = ({
  placeholder = "select an option",
  items,
  value,
  disabled = false,
  onChange,
}) => {
  return (
    <select value={value} disabled={disabled} onChange={onChange}>
      <option value="">{placeholder}</option>
      {items.map((item, index) => {
        return (
          <option key={index + "#"} value={item.value}>
            {item.label}
          </option>
        );
      })}
    </select>
  );
};
