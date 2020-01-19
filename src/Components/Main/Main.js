import React from "react";
import "./Main.css";

// bootstrap
import "bootstrap/dist/css/bootstrap.css";

// import components

/* the Main component is to render the lists. In this app, i could not 
create it but it was just to show that i'm aware of the seperate of concerns */

const Main = props => {
  return (
    <div className="col-8 main-wrapper my-3">
      <ul className="list-group">{props.children}</ul>
    </div>
  );
};

export default Main;
