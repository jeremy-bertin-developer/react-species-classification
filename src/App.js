import React from "react";
import "./App.css";

// bootstrap
import "bootstrap/dist/css/bootstrap.css";

// import components
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import Buttons from "./Components/Buttons/Buttons";
import GroupSpecies from "./Library/species";
// import { newGroupSpecies } from "./Library/species";

let newGroupSpecies = [];

class App extends React.Component {
  state = {
    listSpecies: "",
    isEndanger: false,
    isMammals: false
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
        newGroupSpecies = [];
        const listSpecies = data.result.map(el => {
          //console.log(el)

          const NAME = el.scientific_name;
          const ID = el.taxonid;
          const CATEGORY = el.category;
          const CLASS_NAME = el.class_name;
          el.text = "text";

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

        //console.log(newGroupSpecies)

        // console.log(newGroupSpecies);

        this.setState({
          listSpecies: listSpecies
        });
      });
  };

  handleEndanger = () => {
    let endangerSpecies = newGroupSpecies;
    let newEndangerSpecies = endangerSpecies.map(el => {
      if (el.category === "EN") {
        const NAME = el.name;
        //return NAME;
        //console.log(el)
        return (
          <>
            <li className="text-center">{NAME}</li>
          </>
        );
      }
    });

    this.setState({
      listSpecies: newEndangerSpecies
    });
  };

  handleMammals = () => {
    let mammalsSpecies = newGroupSpecies;
    //console.log(mammalsSpecies)

    let newMammalsSpecies = mammalsSpecies.map(el => {
      //console.log(el.class_name)

      if (el.class_name === "MAMMALIA") {
        const NAME = el.name;

        return (
          <>
            <li className="text-center">{NAME}</li>
          </>
        );
      } 
    });

    this.setState({
      listSpecies: newMammalsSpecies
    });

    //console.log(newMammalsSpecies)
  };

  render() {
    return (
      <>
        <Header />
        <main className="container-fluid">
          <div className="row">
            <div className="col-8 main-wrapper my-3">
              <Buttons
                handleEndanger={this.handleEndanger}
                handleMammals={this.handleMammals}
              />
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
