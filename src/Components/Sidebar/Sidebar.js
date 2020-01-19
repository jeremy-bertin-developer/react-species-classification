import React from "react";
import "./Sidebar.css";

// bootstrap
import "bootstrap/dist/css/bootstrap.css";

// import components

/* the Sidebar component generating the list of the region */
class Sidebar extends React.Component {
  /* the state initialise the listRegion */
  state = {
    listRegion: ""
  };

  /* the handleClick function will send up to the parent the identifier to be re used afterwards */
  handleClick = identifier => {
    this.props.handleSpecies(identifier);
  };

  /* when the app is uploading it displaying the region with the componentDidMount method */
  componentDidMount() {
    fetch(
      "http://apiv3.iucnredlist.org/api/v3/region/list?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee"
    )
      .then(response => {
        return response.json();
      })
      .then(data => {

        /* create the list by mapping over the datas stored in a variable */
        const listRegion = data.results.map((el, index) => {
          const NAME = el.name;

          let { identifier } = this.props;

          identifier = el.identifier;

          // console.log(el)
          // console.log(el.name);
          return (
            <li
              onClick={() => this.handleClick(identifier)}
              key={index}
              value={identifier}
              className="list-group-item text-center"
            >
              {NAME}
            </li>
          );
        });

        /* we attribute finally the state to the variable created just before */
        this.setState({
          listRegion: listRegion
        });
      });
  }

  /* then we render the list */
  render() {
    return (
      <div className="col-4 sidebar-wrapper my-3">
        <h2 className="text-center my-3">CHOOSE A REGION</h2>
        <ul className="list-group">{this.state.listRegion}</ul>
      </div>
    );
  }
}

export default Sidebar;
