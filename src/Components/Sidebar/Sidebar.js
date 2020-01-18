import React from "react";
import "./Sidebar.css";

// bootstrap
import "bootstrap/dist/css/bootstrap.css";

// import components

class Sidebar extends React.Component {

  state = {
    listRegion: ""
  };

  handleClick = (identifier) => {
    this.props.handleSpecies(identifier)
  }

  componentDidMount() {
    fetch(
      "http://apiv3.iucnredlist.org/api/v3/region/list?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee"
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        const listRegion = data.results.map((el, index) => {
          const NAME = el.name;

          let { identifier } = this.props

          identifier = el.identifier;

          // console.log(el)
          // console.log(el.name);
          return (
            <li onClick={() => this.handleClick(identifier)} key={index} value={identifier} className="list-group-item text-center">
                {NAME}
            </li>
          );
        });

        this.setState({
          listRegion: listRegion
        });
      });
  }

  render(){
    return (
      <div className="col-4 sidebar-wrapper my-3">
        <h2 className="text-center">REGION</h2>
        <ul className="list-group">{this.state.listRegion}</ul>
      </div>
);
  }
}

export default Sidebar;
