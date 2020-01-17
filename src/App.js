import React from "react";
import "./App.css";

// bootstrap
import "bootstrap/dist/css/bootstrap.css";

// import components
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import Main from "./Components/Main/Main";

function App() {
  return (
    <>
      <Header />
      <main className="container">
        <div className="row">
          <Main />
          <Sidebar />
        </div>
      </main>
    </>
  );
}

export default App;
