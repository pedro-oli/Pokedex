import React, { Component } from "react";

class Search extends Component {
  render() {
    return (
        <input
            placeholder = "Search pokemon"
            // onChange={(e) => search(e.target.value)}
            // value={value}
        />
    );
  }
}

export default Search ;