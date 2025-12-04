import React, { useState } from "react";
import "./App.css";
import Newstring from "./stringMethods";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">useState With Number (All Methods)</h1>
        <h2 className="title1">Counter App</h2>
        <h1 className="count">{count}</h1>

        <div className="btn-group">
          <button className="btn primary" onClick={() => setCount(5)}>
            Set to 5
          </button>

          <button className="btn" onClick={() => setCount(prev => prev + 1)}>
            ++
          </button>

          <button className="btn" onClick={() => setCount(prev => prev - 1)}>
            --
          </button>

          <button className="btn warning" onClick={() => setCount(prev => prev * 2)}>
            Double
          </button>

          <button className="btn danger" onClick={() => setCount(0)}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}


export default App;
