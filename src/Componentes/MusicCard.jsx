import React, { Component } from 'react';
import propTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.favoritas = this.favoritas.bind(this);
    this.remover = this.remover.bind(this);
    this.escolher = this.escolher.bind(this);
    this.state = {
      loading: false,
      musicasFavoritas: [],
      idMusica: [],
    };
  }

  componentDidMount() {
    this.carregar();
  }

  carregar = async () => {
    this.setState({ loading: true });
    const { idMusica, musicasFavoritas } = this.state;
    const recuperarFavoritas = await getFavoriteSongs();
    this.setState({ loading: false });
    this.setState({
      musicasFavoritas: [...musicasFavoritas, recuperarFavoritas],
      idMusica: [...idMusica, ...recuperarFavoritas.map((e) => e.trackId)],
    });
  }

  async escolher({ target }) {
    const evento = target.checked;
    if (evento === false) {
      this.remover(target);
    }

    if (evento === true) {
      this.favoritas(target);
    }
  }

  async remover(target) {
    const { musicas } = this.props;
    const id = parseInt(target.name, 10);
    this.setState({ loading: true });
    const recuperarFavoritas = musicas.filter((el) => el.trackId === id);
    await removeSong(recuperarFavoritas[0]);
    const ver = await getFavoriteSongs();
    const verMais = ver.map((e) => e.trackId);
    this.setState({ idMusica: verMais });
    this.setState({
      loading: false,
    });
  }

  async favoritas(target) {
    const { musicas } = this.props;
    const id = parseInt(target.name, 10);
    this.setState({
      loading: true,
    });
    const recuperarFavoritas = musicas.filter((el) => el.trackId === id);
    await addSong(recuperarFavoritas[0]);
    const { idMusica } = this.state;
    this.setState({
      loading: false,
      idMusica: [...idMusica, recuperarFavoritas.trackId],
    });
  }

  render() {
    const { musicas } = this.props;
    const { loading, idMusica } = this.state;
    const pegar = musicas.map((elemento, index) => (
      <p key={ index }>
        {elemento.trackName}
        <audio
          key={ elemento.trackName }
          data-testid="audio-component"
          src={ elemento.player }
          controls
        >
          <track kind="captions" />
          <code>audio</code>
        </audio>
        <label htmlFor="favoritas">
          Favorita
          <input
            type="checkbox"
            id="favoritas"
            checked={ (idMusica.some((e) => elemento.trackId === e)) ? true : undefined }
            onChange={ this.escolher }
            data-testid={ `checkbox-music-${elemento.trackId}` }
            name={ elemento.trackId }
          />
        </label>
      </p>
    ));

    return (
      <div className="musicas">

        <ul>
          { pegar }
          {loading === true ? <Loading /> : ''}
        </ul>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicas: propTypes.string.isRequired,
};

export default MusicCard;
