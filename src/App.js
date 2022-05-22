import React, { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import BarChart from "./components/BarChart";

function App() {
  const [data, setData] = useState([210, 240, 60, 120, 150, 175, 350]);
  const [activePage, setActivePage] = useState("form");

  const changeData = () => {
    const MINIMUM = 0;
    const MAXIMUM = 370;

    let randomArray = [];
    for (let i = 0; i < data.length; i++) {
      let randomnumber =
        Math.floor(Math.random() * (MAXIMUM - MINIMUM + 1)) + MINIMUM;
      randomArray[i] = randomnumber;
    }
    setData(randomArray);
  };

  useEffect(() => {
    changeData();
  }, []);
  return (
    <div>
      {activePage === "form" ? (
        <Form utilityFunctions={{ changeData, setActivePage }} />
      ) : (
        <div>
          <h3 className="info-text">
            Fill the form again,{" "}
            <span className="link-text" onClick={() => setActivePage("form")}>
              Click here
            </span>
          </h3>

          <BarChart width={600} height={400} data={data} />
        </div>
      )}
    </div>
  );
}

export default App;
