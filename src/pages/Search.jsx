import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Componentes/Header';
import Loading from '../Componentes/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.recuperar = this.recuperar.bind(this);
    this.buscarArtista = this.buscarArtista.bind(this);
    this.state = {
      artista: '',
      botao: true,
      albuns: [],
      loading: false,
    };
  }

  recuperar({ target }) {
    const { value } = target;
    const verificar = value.length >= parseInt('2', 10);
    this.setState({
      artista: value,
      botao: !verificar,
    });
  }

  async buscarArtista(event) {
    this.setState({ loading: true });
    event.preventDefault();
    const { artista } = this.state;
    // const requisicao = await searchAlbumsAPI(artista);
    this.setState({
      albuns: await searchAlbumsAPI(artista),
      input: '',
      loading: false,
    });
  }

  render() {
    const { artista, botao, input, albuns, loading } = this.state;
    const albunsModificados = albuns.map((elemento) => (
      <div key={ elemento.collectionId }>
        <img src={ elemento.artworkUrl100 } alt="foto" />
        <h1>{elemento.collectionName}</h1>
        <h2>{elemento.artistName}</h2>
        <Link
          data-testid={ `link-to-album-${elemento.collectionId}` }
          to={ `/album/${elemento.collectionId}` }
        >
          ir
        </Link>
      </div>
    ));
    return (
      <div className="inputDiv" data-testid="page-search">
        <span className="cabecalho">
          <Header />
          {loading === true ? (
            <Loading />
          ) : (
            <form action="">
              <label htmlFor="search">
                <input
                  placeholder="Pesquise por seu artista favorito"
                  className="input"
                  value={ input }
                  onChange={ this.recuperar }
                  type="search"
                  id="search"
                  name={ artista }
                  data-testid="search-artist-input"
                />
              </label>
              <button
                onClick={ this.buscarArtista }
                className="botao"
                disabled={ botao }
                data-testid="search-artist-button"
                type="submit"
              >
                Pesquisar
              </button>
            </form>
          )}
        </span>
        <div className="bora">
          <p>{`Resultado de álbuns de: ${artista}`}</p>
          {albuns.length > 0 ? albunsModificados : <p>Nenhum álbum foi encontrado</p>}
        </div>
      </div>
    );
  }
}

export default Search;
