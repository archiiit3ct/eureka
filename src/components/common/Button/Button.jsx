import React from "react";
import cn from "classnames";

import styles from "./Button.module.scss";

const Button = (props) => {
  const { children, onClick, className, disabled } = props;

  return (
    <button
      className={cn(styles.button, className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
