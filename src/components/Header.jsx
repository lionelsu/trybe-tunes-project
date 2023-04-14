import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    name: '',
    loading: false,
  };

  componentDidMount() {
    this.getUserName();
  }

  getUserName = async () => {
    this.setState({ loading: true });
    const { name } = await getUser();
    this.setState({ name, loading: false });
  };

  render() {
    const { name, loading } = this.state;
    return (
      <header data-testid="header-component">
        {
          loading
            ? (<Loading />)
            : (<p data-testid="header-user-name">{ name }</p>)
        }
        <nav>
          <ul>
            <li>
              <Link to="/search" data-testid="link-to-search">
                Search
              </Link>
            </li>
            <li>
              <Link to="/favorites" data-testid="link-to-favorites">
                Favorites
              </Link>
            </li>
            <li>
              <Link to="/profile" data-testid="link-to-profile">
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
