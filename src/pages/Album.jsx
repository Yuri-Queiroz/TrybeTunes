import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Componentes/MusicCard';
import Header from '../Componentes/Header';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      albumName: '',
      nome: '',
      musicas: [],
      recuperar: [],
    };
  }

  componentDidMount() {
    this.mostrar();
  }

  mostrar = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const recuperar = await getMusics(id);
    const musicas = recuperar.filter((elemento) => elemento.trackName);
    this.setState({
      nome: recuperar[0].artistName,
      albumName: recuperar[0].collectionName,
      musicas,
      recuperar,
    });
  };

  render() {
    const { nome, albumName, musicas, recuperar } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{nome}</h1>

        <h2 data-testid="album-name">{albumName}</h2>

        <MusicCard
          musicas={ musicas }
          recuperar={ recuperar }
          album={ albumName }
        />
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.exact({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
