import React from "react";
import styles from "./Button.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { JsxElement } from "typescript";
type ButtonProps = {
  name: string;
  type: "button" | "submit" | "reset" | undefined;
  icon?: IconDefinition;
};

const Button: React.FC<ButtonProps> = ({ name, type, icon }) => {
  return (
    <button type={type} className={styles.button}>
      {icon && <FontAwesomeIcon icon={icon} className={styles.icon} />}
      {name}
    </button>
  );
};

export default Button;
