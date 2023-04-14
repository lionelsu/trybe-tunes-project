import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    name: '',
    loading: false,
    nameValid: false,
    artistName: '',
    albums: null,
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

  creator = async () => {
    const { name } = this.state;
    this.setState({ loading: true });
    const albums = await searchAlbumsAPI(name);
    this.setState({
      name: '',
      loading: false,
      albums,
      artistName: name,
    });
  };

  render() {
    const { name, nameValid, loading, artistName, albums } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? (<Loading />) : (
          <form>
            <input
              type="text"
              data-testid="search-artist-input"
              name="name"
              value={ name }
              onChange={ this.changer }
            />
            <button
              type="submit"
              disabled={ !nameValid }
              onClick={ this.creator }
              data-testid="search-artist-button"
            >
              Pesquisar
            </button>
          </form>
        )}

        {albums && (
          <div>
            <p>
              {`Resultado de álbuns de: ${artistName}`}
            </p>
            {albums.length > 0 ? (
              <ul>
                {albums.map((album) => (
                  <li key={ album.collectionId }>
                    <div>{album.collectionName}</div>
                    <Link
                      to={ `/album/${album.collectionId}` }
                      data-testid={ `link-to-album-${album.collectionId}` }
                    >
                      Ver mais
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhum álbum foi encontrado</p>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Search;
