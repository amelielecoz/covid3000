import React from "react";

import Counter from "../Counter";

const Dashboard = () => {
  return (
    <div className="container mx-auto bg-gray-200">
      <p>Dashboard Page</p>
      <div className="flex space-x-4 p-4 flex-row border border-gray-400">
        <Counter number={1165278} delta={26771} text="cas confirmés" />
        <Counter number={1165278} delta={26771} text="cas confirmés" />
        <Counter
          number={1165278}
          delta={26771}
          text="cas confirmés de coronavirus qui est très méchant"
        />
      </div>
    </div>
  );
};

export default Dashboard;
