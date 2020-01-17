import React from "react";
import "./Sidebar.css";

// bootstrap
import "bootstrap/dist/css/bootstrap.css";

// import components
import List from "../List/List";

function Sidebar() {
  return (
        <div className="col-4 sidebar-wrapper my-3">
          <List />
        </div>
  );
}

export default Sidebar;
