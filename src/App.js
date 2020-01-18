import React from "react";
import "./App.css";

// bootstrap
import "bootstrap/dist/css/bootstrap.css";

// import components
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import Main from "./Components/Main/Main";

class App extends React.Component {
  state = {
    listSpecies: "",
  };

  handleSpecies = identifier => {
    console.log(identifier);

    fetch(
      `http://apiv3.iucnredlist.org/api/v3/species/region/${identifier}/page/0?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee`
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        const listSpecies = data.result.map((el, index) => {
          const NAME = el.scientific_name;
          const IDENTIFIER = el.identifier;

          // console.log(el)
          // console.log(el.name);
          return (
            <>
              <li key={IDENTIFIER} className="list-group-item text-center">
                {NAME}
              </li>
            </>
          );
        });

        this.setState({
          listSpecies: listSpecies,
        });
      });
  };

  render() {
    return (
      <>
        <Header />
        <main className="container-fluid">
          <div className="row">
            <div className="col-8 main-wrapper my-3">
              <ul className="list-group">
                {this.state.listSpecies}</ul>
            </div>
            <Sidebar handleSpecies={this.handleSpecies} />
          </div>
        </main>
      </>
    );
  }
}

export default App;
