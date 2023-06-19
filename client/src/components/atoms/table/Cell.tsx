import React from "react";

type Props = { content: string; type: "td" | "th" };

const Cell: React.FC<Props> = ({ content, type }) => {
  return type === "th" ? <th>{content}</th> : <td>{content}</td>;
};

export default Cell;
