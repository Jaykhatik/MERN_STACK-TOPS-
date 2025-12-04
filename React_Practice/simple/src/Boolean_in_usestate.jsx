import { useState } from "react";
import "./App.css";

function BooleanStateExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bool-container">
      <div className="bool-card">
        <h2 className="title">Boolean State Example</h2>

        <h1 className={`status ${isOpen ? "open" : "closed"}`}>
          {isOpen ? "Open" : "Closed"}
        </h1>

        <div className="btn-group">
          <button className="btn primary" onClick={() => setIsOpen(true)}>
            Open
          </button>

          <button className="btn danger" onClick={() => setIsOpen(false)}>
            Close
          </button>

          <button className="btn toggle" onClick={() => setIsOpen(prev => !prev)}>
            Toggle
          </button>
        </div>
      </div>
    </div>
  );
}

export default BooleanStateExample;
