import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './services/pages/Login';
import Search from './services/pages/Search';
import Album from './services/pages/Album';
import Favorites from './services/pages/Favorites';
import Profile from './services/pages/Profile';
import ProfileEdit from './services/pages/ProfileEdit';
import NotFound from './services/pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <div>
        <p>TrybeTunes</p>

        <BrowserRouter>
          <Route path="/" component={ Login } />
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route component={ NotFound } />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
