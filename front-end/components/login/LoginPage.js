import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AgentService from '../../api/AgentService';
import {
    Button,
    Card,
    CardBody, CardImg,
    CardSubtitle,
    CardText,
    CardTitle,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    Label
} from 'reactstrap';
import folderImage from '../../img/folder.png';

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
        console.log('test');
        e.preventDefault();

        const { handleLogin } = { ...this.props };
        const { email, password } = { ...this.state };
        let { errorMessage } = { ...this.state };

        try {
            const loginResponse = await AgentService.login({ email, password } );
            console.log(JSON.stringify(loginResponse));
            handleLogin(loginResponse);
            return;
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
            <div style={{width: '320px', margin: 'auto'}}>
                <Card style={{margin: '24px'}}>
                    <CardBody>
                        <img style={{display: 'inline-block', width: '60px', height: '60px', objectFit: 'contain'}} className="logo" src={`${window.location.origin}/${folderImage}`} alt="Logo" />
                        <div style={{display: 'inline-block', fontSize: '24px', marginLeft: '24px'}}>MyPass</div>
                        <div style={{fontSize: '18px', borderBottom: '1px solid #ccc', marginBottom: '18px'}}>Login</div>
                        {/*<CardTitle>MyPass</CardTitle>*/}
                        {/*<CardSubtitle>Login</CardSubtitle>*/}
                        {/*<CardText>*/}
                            <Form onSubmit={this.handleLogin}>
                                { errorMessage && <div className="error">{errorMessage}</div>}
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input type="email" name="email" id="email" value={username} onChange={this.handleInputChange} placeholder="Email" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input type="password" name="password" id="password" value={password} onChange={this.handleInputChange} placeholder="Password" />
                                </FormGroup>
                                <Button type="submit">Login</Button>
                            </Form>
                        {/*</CardText>*/}
                    </CardBody>
                </Card>
                {/*<div>*/}
                {/*    Login page*/}
                {/*    <form onSubmit={e => this.handleLogin(e)}>*/}

                {/*        <input name="email" type="email" value={username} onChange={this.handleInputChange} />*/}
                {/*        <input name="password" type="password" value={password} onChange={this.handleInputChange} />*/}
                {/*        <input type="submit" />*/}
                {/*    </form>*/}
                {/*</div>*/}
            </div>
        )
    }
}

LoginPage.propTypes = {
    handleLogin: PropTypes.func.isRequired
};

export default LoginPage;
