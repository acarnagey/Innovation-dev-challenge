import React, { Component } from 'react';
import folderImage from '../../img/add-new.png';
import {Button} from 'reactstrap';
import PropTypes from 'prop-types';
import DocumentDetail from './DocumentDetail';

class AddNewDocument extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { handleAddNew } = { ...this.props };

        handleAddNew();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <img style={{width: '165px', height: '205px', display: 'block', margin: 'auto'}} src={`${window.location.origin}/${folderImage}`} alt="Add New"/>
                <div className="document-title padding-top-12">Add New</div>
                <div className="subtitle padding-bottom-12">NOT UPLOADED</div>
                <Button color="secondary" type="submit">Upload</Button>
            </form>
        )
    }
}

AddNewDocument.propTypes = {
    handleAddNew: PropTypes.func.isRequired
};

export default AddNewDocument;
