import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    album: {},
    musics: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    // const { match } = this.props;
    // const { id } = match.params;
    const album = await getMusics(id);
    const [albumData, ...musicData] = album;
    this.setState({
      album: albumData,
      musics: musicData,
    });
  }

  render() {
    const { album, musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{album.artistName}</p>
        <p data-testid="album-name">{album.collectionName}</p>
        <div>
          {musics.map((music) => (
            <div key={ music.trackId }>
              <MusicCard { ...music } />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
