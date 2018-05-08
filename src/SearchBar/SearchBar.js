import React, { Component } from 'react';
import './SearchBar.css'

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
            term: ''
        }
    this.handleTermChange = this.handleTermChange.bind(this);
    this.search = this.search.bind(this);
  }

  handleTermChange(event) {
    this.setState({searchterm: event.target.value });
  }

  search(){
    this.props.onSearch(this.state.searchterm)
  }

  render() {
      return (
          <div className="SearchBar">
              <input
                  placeholder="Enter A Song, Album, or Artist"
                  conChange={this.handleTermChange} />

              <a onClick={this.search}>SEARCH</a>
          </div>
      );
  }
}

export default SearchBar;
