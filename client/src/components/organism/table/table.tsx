import React, { useState } from "react";
import styles from "./table.module.css";
import Header from "../../molecule/table/Header";
import Row from "../../molecule/table/Row";

type Props = {
  data: any;
};

const Table: React.FC<Props> = ({ data, ...props }) => {
  const [headersName, setHeaderName] = useState<string[]>([]);
  const options = ["name", "birth_year", "species"];
  const fakeData = [
    { name: "Pierre", birth_year: "10/10/ 10", species: "human" },
    { name: "Dona", birth_year: "10/10/ 10", species: "Alien" },
    { name: "Mar", birth_year: "10/10/ 10", species: "Alien" },
  ];
  return (
    <>
      <table>
        <Header content={options} />
        {fakeData.map((d) => {
          //@ts-ignore
          return <Row content={d} />;
        })}
      </table>
    </>
  );
};

export default Table;
