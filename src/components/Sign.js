import React from "react";
import DocTable from "./containers/DocTable";
const Sign = () => {
  return (
    <div>
      <DocTable fetch="signed" />
    </div>
  );
};
export default Sign;
