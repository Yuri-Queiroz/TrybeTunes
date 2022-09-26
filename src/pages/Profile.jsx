import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Componentes/Header';
import Loading from '../Componentes/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      dados: {},
    };
  }

  componentDidMount() {
    this.recuperarInformacoes();
  }

  recuperarInformacoes = async () => {
    this.setState({
      loading: true,
      dados: await getUser(),
    });
    this.setState({ loading: false });
  };

  render() {
    const {
      loading,
      dados: { name, email, description, image },
    } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <div className="formulario">
          {loading === true ? (
            <Loading />
          ) : (
            <div>
              <div>{name}</div>
              <div>{email}</div>
              <div>{description}</div>
              <div>
                <img data-testid="profile-image" src={ image } alt={ name } />
              </div>
            </div>
          )}
          <Link to="/profile/edit">Editar perfil</Link>
        </div>
      </div>
    );
  }
}

export default Profile;
