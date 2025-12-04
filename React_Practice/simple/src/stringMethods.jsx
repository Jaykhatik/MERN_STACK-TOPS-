import { useState } from "react";
import "./App.css";

function StringStateExample() {
  const [name, setName] = useState("Jay");

  return (
    <div className="string-container">
      <div className="string-card">
        <h2 className="title">String State Example</h2>

        <h1 className="name-display">{name || "No Name"}</h1>

        <div className="btn-group">
          <button className="btn primary" onClick={() => setName("Rahul")}>
            Change Name
          </button>

          <button
            className="btn"
            onClick={() => setName((prev) => prev + " Kumar")}
          >
            Add Last Name
          </button>

          <button className="btn danger" onClick={() => setName("")}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default StringStateExample;
