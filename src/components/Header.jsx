import React from 'react';
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

  async getUserName() {
    this.setState({ loading: true });
    const { name } = await getUser();
    this.setState({ name, loading: false });
  }

  render() {
    const { name, loading } = this.state;
    return (
      <header data-testid="header-component">
        {loading ? (<Loading />) : (
          <p data-testid="header-user-name">{ name }</p>
        )}
      </header>
    );
  }
}

export default Header;
