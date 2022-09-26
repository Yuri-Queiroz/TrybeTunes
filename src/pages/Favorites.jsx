import React, { Component } from 'react';
import Header from '../Componentes/Header';
import Loading from '../Componentes/Loading';
import MusicCard from '../Componentes/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();
    this.recuperar = this.recuperar.bind(this);
    this.state = {
      musicasRecuperadas: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.recuperar();
  }

  async recuperar() {
    this.setState({ loading: true });
    this.setState({
      musicasRecuperadas: await getFavoriteSongs(),
      loading: false,
    });
    const { musicasRecuperadas } = this.state;
    console.log(musicasRecuperadas);
  }

  render() {
    const { loading, musicasRecuperadas } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading === true ? (
          <Loading />
        ) : (
          <MusicCard musicas={ musicasRecuperadas } />
        )}
      </div>
    );
  }
}

export default Favorites;
