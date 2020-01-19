import React from "react";
import "./Main.css";

/* the Main component is to render the lists. In this app, i could not 
create it but it was just to show that i'm aware of the seperate of concerns */

const Main = props => {

  const { children } = props;
  return (
    <div className="col-8 main-wrapper my-3">
      <ul className="list-group">{children}</ul>
    </div>
  );
};

export default Main;
