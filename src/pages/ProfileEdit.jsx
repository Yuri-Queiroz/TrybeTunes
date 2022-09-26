import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../Componentes/Header';
import Loading from '../Componentes/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.recuperar = this.recuperar.bind(this);
    this.atualizarValor = this.atualizarValor.bind(this);
    this.habilitar = this.habilitar.bind(this);
    this.atualizarDados = this.atualizarDados.bind(this);
    this.state = {
      loading: false,
      name: '',
      email: '',
      description: '',
      image: '',
      habilitado: true,
      redirecionar: false,
    };
  }

  componentDidMount() {
    this.recuperar();
  }

  atualizarValor({ target }) {
    this.setState({
      [target.name]: target.value,
    });
    this.habilitar();
  }

  async recuperar() {
    this.setState({
      loading: true,
    });
    const dados = await getUser();
    this.setState({
      loading: false,
      name: dados.name,
      email: dados.email,
      description: dados.description,
      image: dados.image,
    });
    this.habilitar();
  }

  async atualizarDados() {
    const { name, email, description, image } = this.state;
    this.setState({ loading: true });
    await updateUser({
      name,
      email,
      image,
      description,
    });
    this.setState({ loading: false, redirecionar: true });
  }

  habilitar() {
    const { name, email, description, image } = this.state;
    const modelo = /\S+@\S+\.\S+/;
    const habilitando = !(name.length > 0
      && email.length > 0
      && description.length > 0
      && image.length > 0
      && modelo.test(email));
    this.setState({
      habilitado: habilitando,
    });
  }

  render() {
    const {
      loading,
      name, email, description, image, habilitado, redirecionar,
    } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading === true ? <Loading /> : ''}
        {redirecionar === true ? <Redirect to="/profile" /> : ''}
        <div className="formulario">
          <form>
            <label htmlFor="name">
              <input
                type="text"
                name="name"
                value={ name }
                data-testid="edit-input-name"
                onChange={ this.atualizarValor }
              />
            </label>
            <label htmlFor="email">
              <input
                type="email"
                name="email"
                value={ email }
                data-testid="edit-input-email"
                onChange={ this.atualizarValor }
              />
            </label>
            <label htmlFor="description">
              <input
                type="text"
                name="description"
                value={ description }
                data-testid="edit-input-description"
                onChange={ this.atualizarValor }
              />
            </label>
            <label htmlFor="image">
              <input
                type="text"
                name="image"
                value={ image }
                data-testid="edit-input-image"
                onChange={ this.atualizarValor }
              />
            </label>
          </form>
          <button
            disabled={ habilitado }
            type="submit"
            data-testid="edit-button-save"
            onClick={ this.atualizarDados }
          >
            Editar perfil
          </button>
        </div>
      </div>
    );
  }
}

export default ProfileEdit;
