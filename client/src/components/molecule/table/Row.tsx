import React from "react";
import Cell from "../../atoms/table/Cell";

type Props = {
  content: string[];
};

const Row: React.FC<Props> = ({ content }) => {
  return (
    <tr>
      {Object.keys(content).map((c) => (
        //@ts-ignore
        <Cell content={content[c]} type="td" />
      ))}
    </tr>
  );
};

export default Row;
