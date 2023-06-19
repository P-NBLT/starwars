import React from "react";
import styles from "./typography.module.css";

type Props = {
  children: React.ReactNode;
  type?: any;
  options?: any;
  style?: any;
  onClick?: any;
  className?: any;
};

const Typography: React.FC<Props> = ({
  children,
  type,
  options = [],
  className,
  ...props
}) => {
  function buildClassName(type: string = "normal", options: string[]) {
    if (type) options.push(type);
    let temp = options
      .map((o) => {
        o = styles[o];
        return o;
      })
      .join(" ");

    return temp;
  }

  const classes = buildClassName(type, options);

  return (
    <p {...props} className={`${className} ${classes}`}>
      {children}
    </p>
  );
};

export default Typography;
