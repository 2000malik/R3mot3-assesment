import React, { ReactNode } from "react";

type Props = {
  disabled?: boolean;
  children: ReactNode;
  loading?: boolean;
  textStyle?: object;
  type?: "button" | "submit" | "reset";
  handleOnclick: () => void;
};

const styles = {
  ButtonText: {
    fontSize: 18,
    fontWeight: "400",
    fontStyle: "normal",
    color: "#ffffff",
  },
};

export const Button: React.FC<Props> = ({
  disabled = false,
  loading,
  textStyle,
  type = "button",
  handleOnclick,
  children,
}) => {
  const combinedStyle = { ...styles.ButtonText, ...textStyle };
  return (
    <button disabled={disabled} type={type} onClick={handleOnclick}>
      {loading ? (
        <span style={combinedStyle}>Processing ...</span>
      ) : (
        <span style={combinedStyle}>{children}</span>
      )}
    </button>
  );
};
