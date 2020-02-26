import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import AgentService from '../../api/AgentService';
import DocumentSummary from './DocumentSummary';
import DocumentDetail from './DocumentDetail';
import folderImage from '../../img/folder.png';
import {Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row} from 'reactstrap';
import './HomePage.scss';
import Profile from './Profile';
import SearchInput from '../common/SearchInput';
import Chevron from '../common/Chevron';
import AddNewDocument from './AddNewDocument';
import Dropzone from 'react-dropzone';

class HomePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            documents: [],
            searchedDocuments: [],
            documentSelected: null,
            isProfile: false,
            sortAsc: true,
            showModal: false
        };

        this.handleSelectDocument = this.handleSelectDocument.bind(this);
        this.handleSearchDocuments = this.handleSearchDocuments.bind(this);
        this.goBack = this.goBack.bind(this);
        this.goToProfile = this.goToProfile.bind(this);
        this.toggleSort = this.toggleSort.bind(this);
        this.handleAddNew = this.handleAddNew.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    async componentDidMount() {
        const { account } = { ...this.props };
        const { sortAsc } = { ...this.state };
        let documents = (await AgentService.getDocuments(account.accountId)).documents;
        this.setState({ documents, searchedDocuments: this.sortDocuments(documents, sortAsc) });
    }

    handleSearchDocuments(query) {
        const { documents, sortAsc } = { ...this.state };
        let searchedDocuments = documents
            .filter(document => {
                return document.type.toLowerCase().indexOf(query.toLowerCase()) !== -1
            });
        searchedDocuments = this.sortDocuments(searchedDocuments, sortAsc);
        this.setState({searchedDocuments});
    }

    toggleSort() {
        let { sortAsc, searchedDocuments } = { ...this.state };
        sortAsc = !sortAsc;
        searchedDocuments = this.sortDocuments(searchedDocuments, sortAsc);
        this.setState({ sortAsc, searchedDocuments })
    }

    sortDocuments(documents, sortAsc) {
        return documents.sort((docA, docB) => {
            if (docA.type < docB.type) {
                const sortVal = sortAsc ? -1 : 1;
                return sortVal;
            }
            if (docA.type > docB.type) {
                const sortVal = sortAsc ? 1 : -1;
                return sortVal;
            }
            return 0;
        }, sortAsc);
    }

    handleSelectDocument(document) {
        this.setState({documentSelected: document});
    }

    goToProfile() {
        this.setState({documentSelected: null, isProfile: true})
    }

    goBack() {
        this.setState({documentSelected: null, isProfile: false})
    }

    handleAddNew() {
        this.toggleModal();
    }

    toggleModal() {
        let { showModal } = { ...this.state };
        this.setState({showModal: !showModal});
    }

    renderModal() {
        const { showModal } = { ...this.state };

        return (
            <Fragment>
                <Modal isOpen={showModal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Upload Document</ModalHeader>
                    <ModalBody>
                        <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                            {({getRootProps, getInputProps}) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggleModal}>Confirm</Button>{' '}
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        );
    }

    render() {
        const { account } = { ...this.props };
        const { searchedDocuments, documentSelected, isProfile, sortAsc } = { ...this.state };

        return (
        <div id="home-container">
            { this.renderModal() }
            <div id="home-top-bar">
                <div id="home-logo">
                    <img className="logo" src={`${window.location.origin}/${folderImage}`} alt="Logo" />
                </div>
                <Row id="home-search">
                    <Col style={{display: 'flex'}}>
                        <SearchInput handleSearch={this.handleSearchDocuments} />
                    </Col>
                </Row>
                <div id="home-profile" onClick={this.goToProfile}>
                    <img className="account-profile-image" src={account.profileimgUrl} />
                </div>
            </div>
            <div className="home-content">
                <div className="home-side" />
                <div className="home-main">
                { isProfile && (
                    <Profile goBack={this.goBack} account={account} />
                )}
                { (!documentSelected && !isProfile) && (
                    <div>
                        <div className="title">My Documents</div>
                        <div>Sort by <span style={{cursor: 'pointer'}} onClick={this.toggleSort}>NAME <Chevron isAscending={sortAsc} /></span></div>
                        <Row>
                            <Col
                                sm="12"
                                md="6"
                                lg="4"
                                className="document-summary-container"
                            >
                                <AddNewDocument handleAddNew={this.handleAddNew} />
                            </Col>
                            { searchedDocuments.map((document, idx) => {
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
                    </div>
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
