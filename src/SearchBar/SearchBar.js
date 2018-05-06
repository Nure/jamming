import React, { Component } from 'react';
import './SearchBar.css'

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }
  search(term){
    this.props.onSearch(this.state.term)
  }
  handleTermChange(event) {
    this.setState({ term: event.target.value });
    console.log('handle term change')
  }
  render() {
      return (
          <div className="SearchBar">
              <input placeholder="Enter A Song, Album, or Artist" conChange={this.handleTermChange} />
              <a>SEARCH</a>
          </div>
      );
  }
}

export default SearchBar;
