import PropTypes from 'prop-types';
import React from 'react';
import Loading from '../pages/Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    favorite: false,
    loading: false,
  };

  async componentDidMount() {
    const { trackId } = this.props;
    const favoriteMusics = await getFavoriteSongs();
    const isFavorite = favoriteMusics.some((music) => music.trackId === trackId);
    if (isFavorite) {
      this.setState({ favorite: true });
    }
  }

  checkBoxChanger = async () => {
    this.setState((prevState) => ({
      loading: true,
      favorite: !prevState.checked,
    }));
    await addSong(this.props);
    this.setState({ loading: false });
  };

  makeFavorite() {
    const { trackId, isFavorite } = this.props;
    const { favorite } = this.state;
    return (
      <label
        htmlFor={ trackId }
        data-testid={ `checkbox-music-${trackId}` }
      >
        Favorita
        <input
          type="checkbox"
          id={ trackId }
          checked={ favorite || isFavorite }
          onChange={ this.checkBoxChanger }
        />
      </label>
    );
  }

  render() {
    const { trackName, previewUrl } = this.props;
    const { loading } = this.state;
    return (
      <div>
        <p>{trackName}</p>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        {loading ? <Loading /> : (this.makeFavorite())}
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
}.isRequired;

export default MusicCard;
