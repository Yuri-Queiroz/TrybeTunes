import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import NoteFound from './pages/NoteFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Loading from './Componentes/Loading';

class App extends React.Component {
  render() {
    return (
      <div>

        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/search" component={ Search } />
            <Route exact path="/album/:id" render={ (props) => <Album { ...props } /> } />
            <Route exact path="/favorites" component={ Favorites } />
            <Route exact path="/profile" component={ Profile } />
            <Route exact path="/profile/edit" component={ ProfileEdit } />
            <Route exact path="/page/not/found" component={ NoteFound } />
            <Route exact path="/loading" component={ Loading } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
