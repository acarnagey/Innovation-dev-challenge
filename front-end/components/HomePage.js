import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoginPage from './LoginPage';

class HomePage extends Component {

    render() {
        const { account } = { ...this.props };

        return (
        <div>
            Home Page
            <pre>{JSON.stringify(account)}</pre>
        </div>
        );
    }
}

HomePage.propTypes = {
    account: PropTypes.object.isRequired
};

export default HomePage;
