import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    name: '',
    nameValid: false,
  };

  changer = (event) => {
    const { value } = event.target;
    const maxLength = 2;
    const nameValid = value.length >= maxLength;
    this.setState({
      name: value,
      nameValid,
    });
  };

  render() {
    const { name, nameValid } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            name="name"
            id="name"
            data-testid="search-artist-input"
            value={ name }
            onChange={ this.changer }
          />
          <button
            type="submit"
            disabled={ !nameValid }
            data-testid="search-artist-button"
          >
            Search
          </button>

        </form>
      </div>
    );
  }
}

export default Search;
