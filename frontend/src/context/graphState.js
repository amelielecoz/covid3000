import React, { useState } from "react";
import GraphContext from "./graphContext";

const GraphState = (props) => {
  const [type, setType] = useState("hosp");
  const [color, setColor] = useState("steelblue");

  return (
    <GraphContext.Provider
      value={{
        type,
        setType,
      }}
    >
      {props.children}
    </GraphContext.Provider>
  );
};

export default GraphState;
