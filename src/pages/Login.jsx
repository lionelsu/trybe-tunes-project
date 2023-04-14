import PropTypes from 'prop-types';
import React from 'react';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  state = {
    name: '',
    loading: false,
    nameValid: false,
  };

  changer = (event) => {
    const { value } = event.target;
    const maxLength = 3;
    const nameValid = value.length >= maxLength;
    this.setState({
      name: value,
      nameValid,
    });
  };

  creator = async () => {
    const { name } = this.state;
    const { history } = this.props;

    this.setState({ loading: true });
    await createUser({ name });
    history.push('/search');
    this.setState({ loading: false });
  };

  render() {
    const { nameValid, loading } = this.state;
    return (
      <div data-testid="page-login">
        {loading ? (<Loading />) : (
          <form>
            <input
              type="text"
              data-testid="login-name-input"
              onChange={ this.changer }
            />
            <button
              type="submit"
              disabled={ !nameValid }
              onClick={ this.creator }
              data-testid="login-submit-button"
            >
              Entrar
            </button>
          </form>
        )}

      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
