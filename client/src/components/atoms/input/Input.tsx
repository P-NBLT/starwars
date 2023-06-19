import React from "react";
import styles from "./input.module.css";

const Input: React.FC<{
  id?: string;
  type?: string;
  onChange?: any;
  placeholder?: string;
  onClick?: any;
}> = ({ ...rest }) => {
  return (
    <div className={styles.masterContainer}>
      <label htmlFor={rest.id}>{rest.id}</label>
      <input {...rest} className={`${styles.inputContainer}`} />
    </div>
  );
};

export default Input;
