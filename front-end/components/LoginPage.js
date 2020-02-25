import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AgentService from '../api/AgentService'

class LoginPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errorMessage: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleInputChange(e) {
        const { value } = e.target;
        this.setState({ [e.target.name]: value });
    }

    async handleLogin(e) {
        e.preventDefault();

        const { handleLogin } = { ...this.props };
        const { email, password } = { ...this.state };
        let { errorMessage } = { ...this.state };

        try {
            const loginResponse = await AgentService.login({ email, password } );
            console.log(JSON.stringify(loginResponse));
            handleLogin(loginResponse);
        } catch (err) {
            if (err && err.error && err.error.message) {
                errorMessage = err.error.message;
            } else {
                errorMessage = "Oops, something went wrong. Please try again in a few minutes.";
            }
        }
        this.setState({ errorMessage });
    }

    render() {
        const { username, password, errorMessage } = { ...this.state };

        return (
            <div>
                Login page
                <form onSubmit={e => this.handleLogin(e)}>
                    { errorMessage && <div className="error">{errorMessage}</div>}
                    <input name="email" type="email" value={username} onChange={this.handleInputChange} />
                    <input name="password" type="password" value={password} onChange={this.handleInputChange} />
                    <input type="submit" />
                </form>
            </div>
        )
    }
}

LoginPage.propTypes = {
    handleLogin: PropTypes.func.isRequired
};

export default LoginPage;
