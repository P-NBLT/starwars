import React from "react";
import Cell from "../../atoms/table/Cell";

type Props = { content: string[] };

const Header: React.FC<Props> = ({ content }) => {
  return (
    <tr>
      {content.map((c) => (
        <Cell content={c} type="th" />
      ))}
    </tr>
  );
};

export default Header;
