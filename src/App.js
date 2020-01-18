import React from "react";
import "./App.css";

// bootstrap
import "bootstrap/dist/css/bootstrap.css";

// import components
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import Buttons from "./Components/Buttons/Buttons";
import GroupSpecies from "./Library/species";
import { newGroupSpecies } from "./Library/species";

class App extends React.Component {
  state = {
    listSpecies: ""
  };

  handleSpecies = identifier => {
    // console.log(identifier);

    fetch(
      `http://apiv3.iucnredlist.org/api/v3/species/region/${identifier}/page/0?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee`
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        const listSpecies = data.result.map((el, index) => {
          //console.log(el)

          const NAME = el.scientific_name;
          const ID = el.taxonid;
          const CATEGORY = el.category;
          const CLASS_NAME = el.class_name;

          const speciesPerRegion = new GroupSpecies(
            identifier,
            NAME,
            ID,
            CATEGORY,
            CLASS_NAME
          );

          newGroupSpecies.push(speciesPerRegion);

          // console.log(el)
          // console.log(el.name);
          return (
            <>
              <li key={ID} className="text-center">
                {NAME}
              </li>
            </>
          );
        });

        // console.log(newGroupSpecies);

        this.setState({
          listSpecies: listSpecies
        });
      });
  };

  handleEndanger = () => {

    const endangerSpecies = newGroupSpecies.map(el => {

      if (el.category === "EN") {
        const NAME = el.name;
        //return NAME;
        //console.log(el)
        return (
            <>
              <li className="text-center">
                {NAME}
              </li>
            </>
          );
      }
    });

    this.setState({
      listSpecies: endangerSpecies
    });
  };

  handleMammals = () => {

    const mammalsSpecies = newGroupSpecies.map(el => {
      console.log(el.class_name)

      if (el.class_name === "MAMMALIA") {
        const NAME = el.name;
        //return NAME;
        // console.log(NAME)
        return (
            <>
              <li className="text-center">
                {NAME}
              </li>
            </>
          );
      }
    });

    this.setState({
      listSpecies: mammalsSpecies
    });
  };

  render() {
    return (
      <>
        <Header />
        <main className="container-fluid">
          <div className="row">
            <div className="col-8 main-wrapper my-3">
              <Buttons handleEndanger={this.handleEndanger} handleMammals={this.handleMammals}/>
              <ul className="list-group">{this.state.listSpecies}</ul>
            </div>
            <Sidebar handleSpecies={this.handleSpecies} />
          </div>
        </main>
      </>
    );
  }
}

export default App;
