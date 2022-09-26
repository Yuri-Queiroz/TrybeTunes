import React, { Component } from 'react';
import propTypes from 'prop-types';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();
    this.capturarNome = this.capturarNome.bind(this);
    this.criar = this.criar.bind(this);
    this.state = {
      nomeUsuario: '',
      botao: true,
    };
  }

  async criar() {
    const { nomeUsuario } = this.state;
    const { history } = this.props;
    history.push('/loading');
    await createUser({
      name: nomeUsuario,
      email: '',
      description: '',
      image: '',
    });
    history.push('/search');
  }

  capturarNome({ target }) {
    const { value } = target;
    const verificar = value.length >= parseInt('3', 10);
    this.setState({
      nomeUsuario: value,
      botao: !verificar,
    });
  }

  render() {
    const { botao } = this.state;
    return (
      <div data-testid="page-login">
        <span className="cabecalho">
          <p>TrybeTunes</p>
        </span>
        <div className="inputDiv">
          <form action="">
            <label htmlFor="nameUser">
              <input
                placeholder="Digite seu nome"
                className="input"
                onChange={ this.capturarNome }
                type="text"
                data-testid="login-name-input"
                id="nameUser"
              />
            </label>
            <div>
              <button
                className="botao"
                type="submit"
                disabled={ botao }
                data-testid="login-submit-button"
                onClick={ this.criar }
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: propTypes.objectOf(propTypes.string).isRequired,
};

export default Login;
