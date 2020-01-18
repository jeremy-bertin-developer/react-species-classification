import React from "react";
import './Buttons.css';

const Buttons = props => {
  return (
    <div
      className="btn-group btn-group-lg mx-auto text-center mb-3"
      role="group"
      aria-label="..."
    >
      <button onClick={props.handleEndanger} type="button" className="btn">
        Endanger
      </button>
      <button onClick={props.handleMammals} type="button" className="btn">
        Mammals
      </button>
    </div>
  );
};

export default Buttons;
