import React from "react";
import styles from "./Card.module.css";

type Styling = {
  margin: string;
};

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  console.log(styles);
  return <div className={`${styles.masterContainer}`}>{children}</div>;
};

export default Card;
