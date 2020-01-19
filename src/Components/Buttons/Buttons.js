import React from "react";
import "./Buttons.css";

/* the Buttons component generate two buttons that have the function to render the endanger list or the mammals list */
const Buttons = props => {
  return (
    <div
      className="btn-group btn-group-lg mx-auto text-center mb-3"
      role="group"
      aria-label="..."
    >
      <button onClick={props.handleEndanger} type="button" className="btn">
        Endangered Species
      </button>
      <button onClick={props.handleMammals} type="button" className="btn">
        Mammals Species
      </button>
    </div>
  );
};

export default Buttons;
