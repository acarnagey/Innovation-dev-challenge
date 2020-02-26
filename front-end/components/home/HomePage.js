import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AgentService from '../api/AgentService';
import DocumentSummary from './DocumentSummary';
import DocumentDetail from './DocumentDetail';
import folderImage from '../img/folder.png';
import {Button, Col, Row} from 'reactstrap';

class HomePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            documents: [],
            documentSelected: null
        };

        this.handleSelectDocument = this.handleSelectDocument.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    async componentDidMount() {
        const { account } = { ...this.props };
        let documents = (await AgentService.getDocuments(account.accountId)).documents;
        this.setState({ documents });
    }

    handleSelectDocument(document) {
        this.setState({documentSelected: document});
    }

    goBack() {
        this.setState({documentSelected: null})
    }

    render() {
        const { account } = { ...this.props };
        const { documents, documentSelected } = { ...this.state };

        return (
        <div id="home-container">
            <div id="home-top-bar">
                <div id="home-logo">
                    <img className="logo" src={`${window.location.origin}/${folderImage}`} />
                </div>
                <Row id="home-search">
                    <Col style={{display: 'flex'}}>
                        <input className="search" type="search" placeholder="Search..." />
                        <Button color="primary">Search</Button>
                    </Col>
                </Row>
                <div id="home-profile">
                    <img className="account-profile-image" src={account.profileimgUrl} />
                </div>
            </div>
            <div className="home-content">
                <div className="home-side" />
                <div className="home-main">
                { !documentSelected && (
                    <Row>
                        { documents.map((document, idx) => {
                            return (
                                <Col
                                    sm="12"
                                    md="6"
                                    lg="4"
                                    key={idx}
                                    onClick={() => this.handleSelectDocument(document)}
                                    className="document-summary-container"
                                >
                                    <DocumentSummary document={document} documentIdx={idx++} />
                                </Col>
                            );
                        })}
                    </Row>
                )}
                { documentSelected && (
                    <DocumentDetail document={documentSelected} goBack={this.goBack} />
                )}
                </div>
            </div>
        </div>
        );
    }
}

HomePage.propTypes = {
    account: PropTypes.shape({
        profileimgUrl: PropTypes.string.isRequired,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        accountId: PropTypes.string.isRequired,
    }).isRequired
};

export default HomePage;
