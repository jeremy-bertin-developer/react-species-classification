import React from "react";
import "./List.css";

// bootstrap
import "bootstrap/dist/css/bootstrap.css";

// import components

class List extends React.Component {
  state = {
    listRegion: ""
  };

  componentDidMount() {
    fetch(
      "http://apiv3.iucnredlist.org/api/v3/region/list?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee"
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data.results[0].name);
        const listRegion = data.results.map((el, index) => {
          return (
            <li onClick="click" key={index} className="list-group-item">
                {el.name}
            </li>
          );
        });

        this.setState({
          listRegion: listRegion
        });
      });
  }

  render() {
    return (
        <ul className="list-group">{this.state.listRegion}</ul>
    );
  }
}

export default List;
