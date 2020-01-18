import React from "react";
import "./Main.css";

// bootstrap
import "bootstrap/dist/css/bootstrap.css";

// import components

class Main extends React.Component {
  // state = {
  //   listSpecies: ""
  // };

  // componentDidMount() {
  //   fetch(
  //     "http://apiv3.iucnredlist.org/api/v3/species/region/europe/page/0?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee"
  //   )
  //     .then(response => {
  //       return response.json();
  //     })
  //     .then(data => {
  //       const listSpecies = data.result.map((el, index) => {
  //         const NAME = el.scientific_name;
  //         const IDENTIFIER = el.identifier;

  //         // console.log(el)
  //         // console.log(el.name);
  //         return (
  //           <li key={IDENTIFIER} className="list-group-item text-center">
  //               {NAME}
  //           </li>
  //         );
  //       });

  //       this.setState({
  //           listSpecies: listSpecies
  //       });
  //     });
  // }

  render(){
    return (
      <div className="col-8 main-wrapper my-3">
        <ul className="list-group">
          {/* {this.state.listSpecies} */}
          {this.props.children}
        </ul>
      </div>
);
  }
}

export default Main;