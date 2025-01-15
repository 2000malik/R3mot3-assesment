import React, { ChangeEvent } from "react";

type Props = {
  value: string;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  placeholder?: string;
};

export const SearchBox: React.FC<Props> = ({
  value,
  onChange,
  disabled = false,
  placeholder = "Search",
}) => {
  return (
    <input
      type="search"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};
