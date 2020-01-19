import React from "react";
import "./Buttons.css";

/* the Buttons component generate two buttons that have the function to render the endanger list or the mammals list */
const Buttons = props => {

  const { handleEndanger, handleMammals } = props;
  
  return (
    <div
      className="btn-group btn-group-lg text-center mb-3"
      role="group"
      aria-label="..."
    >
      <button onClick={handleEndanger} type="button" className="btn">
        Endangered Species
      </button>
      <button onClick={handleMammals} type="button" className="btn">
        Mammals Species
      </button>
    </div>
  );
};

export default Buttons;
