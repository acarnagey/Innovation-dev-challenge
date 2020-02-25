import React, { Component } from 'react'
import HomePage from './HomePage';
import LoginPage from './LoginPage';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false,
            account: null
        };

        this.handleLogin = this.handleLogin.bind(this);
    }

    async handleLogin(loginResponse) {
        let { isLoggedIn, account } = { ...this.state };
        if(loginResponse && loginResponse.account && loginResponse.account.accountId ) {
            isLoggedIn = true;
            ({ account } = { ...loginResponse })
        }
        this.setState({ isLoggedIn, account });
    }

    render() {
        const { isLoggedIn, account } = { ...this.state };
        return (
            <div>
                The App
                { isLoggedIn && <HomePage account={account} /> }
                { !isLoggedIn && <LoginPage handleLogin={this.handleLogin} /> }
            </div>
        )
    }
}

export default App;
