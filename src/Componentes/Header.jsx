import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();
    this.recuperar = this.recuperar.bind(this);
    this.state = {
      user: [],
    };
  }

  componentDidMount() {
    this.recuperar();
  }

  async recuperar() {
    const recuperar = await getUser();
    this.setState({
      user: recuperar.name,
    });
  }

  render() {
    const { user } = this.state;
    // this.recuperar();
    return (
      <header className="header" data-testid="header-component">
        <Link className="link" to="/search" data-testid="link-to-search">
          Pesquisas
        </Link>

        <Link className="link" to="/favorites" data-testid="link-to-favorites">
          Favoritos
        </Link>

        <Link className="link" to="/profile" data-testid="link-to-profile">
          Perfil
        </Link>
        <div className="cor" data-testid="header-user-name">
          {user.length === 0 ? <Loading /> : ''}
          <div>{user}</div>
        </div>
      </header>
    );
  }
}

export default Header;
