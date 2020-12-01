import React from "react";
import "./App.css";

// bootstrap
import "bootstrap/dist/css/bootstrap.css";

// import components
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import Buttons from "./Components/Buttons/Buttons";
import GroupSpecies from "./Library/species";

class App extends React.Component {
  constructor(props) {
    super(props);
    /* listSpecies will render the list of the spcies, all of them per region or by mammals or endangered.
    isRegion is use for rendering the region name matching with the list on top of the list */
    this.state = {
      listSpecies: "",
      isRegion: false,
      isClicked: false
    };
    /* newGroupSpecies will be the array variable that i will use all over the app to generate and render all the lists */
    this.newGroupSpecies = [];
  }
  //__________________________________________________________________________________________________________

  /* handleSpecies handle the list of species per region */
  handleSpecies = identifier => {
    /* once the function is clicked  newGroupSpecies is clened up*/
    this.newGroupSpecies = [];
    /* then the API is fetch to get the list of species accordingly to the identifier that was passed from the child component Sidebar */
    fetch(
      `http://apiv3.iucnredlist.org/api/v3/species/region/${identifier}/page/0?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee`
    )
      /* i did not put any specific error handling but it can be done */
      .then(response => {
        return response.json();
      })
      .then(data => {
        /* listSpecies is generating the list by mapping through the data given from the fetch */
        const LIST_SPECIES = data.result.map(el => {
          /* here i store the value that i need into variables */
          const NAME = el.scientific_name;
          const ID = el.taxonid;
          const CATEGORY = el.category;
          const CLASS_NAME = el.class_name;

          /* here i create a new object based on the model object */
          const SPECIES_PER_REGION = new GroupSpecies(
            identifier,
            NAME,
            ID,
            CATEGORY,
            CLASS_NAME
          );

          /* then i push all those objects into the empty array newGroupSpecies 
          i will need this array of objects to render later on the mammals and the endangered species*/
          this.newGroupSpecies.push(SPECIES_PER_REGION);
          /* return the result of all the species as a list */
          return (
            <>
              <li key={ID} className="text-center">
                {NAME}
              </li>
            </>
          );
        });
        /* here is to get the name of the region that have been clicked and display it on top of the list */
        let regionSpecies = this.newGroupSpecies[0].region;
        regionSpecies = regionSpecies.replace(/_/g, " ").toUpperCase();

        /* creating a variable to render the title of the list and the list itself */
        const ULIST = (
          <>
            <h2 className="enTitle text-center p-3 m-3">
              All Species from {regionSpecies}
            </h2>
            <ul className="list-group">{LIST_SPECIES}</ul>
          </>
        );

        /* updating the state for the last render method */
        this.setState({
          listSpecies: ULIST,
          isRegion: true
        });
      });
  };

  //__________________________________________________________________________________________________________

  /* handleEndanger will handle the endangered list from the region */
  handleEndanger = () => {
    /* once the whole list have been generated, i associate that list to a new variable. 
    because  newGroupSpecies will be cleaned up awhen we will click on a new region*/
    const ENDANGER_SPECIES = this.newGroupSpecies;

    /* getting the name of the region for the title */
    let regionSpecies = this.newGroupSpecies[0].region;
    regionSpecies = regionSpecies.replace(/_/g, " ").toUpperCase();

    /* mapping over the array and filter the category to get only the endangered species */
    const NEW_ENDANGER_SPECIES = ENDANGER_SPECIES.map(el => {
      if (el.category === "EN") {
        const NAME = el.name;

        /* return as list item */
        return (
          <>
            <li className="text-center">{NAME}</li>
          </>
        );
      }
    });

    /* generating a new variable to store the title and the list */
    const uList = (
      <>
        <h2 className="enTitle text-center p-3 m-3">
          Endangered Species from {regionSpecies}
        </h2>
        <ul className="list-group">{NEW_ENDANGER_SPECIES}</ul>
      </>
    );

    /* update the state with the new list */
    this.setState({
      listSpecies: uList
    });
  };

  //__________________________________________________________________________________________________________

  /* handleMammals does of course the same thing as handleEndanger */
  handleMammals = () => {
    const MAMMALS_SPECIES = this.newGroupSpecies;

    let regionSpecies = this.newGroupSpecies[0].region;
    regionSpecies = regionSpecies.replace(/_/g, " ").toUpperCase();

    const NEW_MAMMALS_SPECIES = MAMMALS_SPECIES.map(el => {
      if (el.class_name === "MAMMALIA") {
        const NAME = el.name;

        return (
          <>
            <li className="text-center">{NAME}</li>
          </>
        );
      }
    });

    let uList = (
      <>
        <h2 className="enTitle text-center p-3 m-3">
          Mammals Species from {regionSpecies}
        </h2>
        <ul className="list-group">{NEW_MAMMALS_SPECIES}</ul>
      </>
    );

    this.setState({
      listSpecies: uList
    });
  };

  //__________________________________________________________________________________________________________

  /* then render the whole app */
  render() {
    return (
      <>
        <Header />
        <main className="container-fluid">
          <div className="row">
            <div className="col-8 main-wrapper my-3">
              {this.state.isRegion && (
                <Buttons
                  handleEndanger={this.handleEndanger}
                  handleMammals={this.handleMammals}
                />
              )}
              {this.state.listSpecies}
            </div>

            <Sidebar handleSpecies={this.handleSpecies} />
          </div>
        </main>
      </>
    );
  }
}

export default App;
