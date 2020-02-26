import React, { Component } from 'react'
import HomePage from './home/HomePage';
import LoginPage from './login/LoginPage';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false,
            account: null
        };
        // NOTE: used for testing to skip login
        // this.state = {
        //     isLoggedIn: true,
        //     account: {
        //         "profileimgUrl": "https://i.imgur.com/PzWBXxZ.png",
        //         "firstName": "Sally",
        //         "lastName": "Sue",
        //         "accountId": "420123"
        //     }
        // };

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
                { isLoggedIn && <HomePage account={account} /> }
                { !isLoggedIn && <LoginPage handleLogin={this.handleLogin} /> }
            </div>
        )
    }
}

export default App;
