import React, { Component } from 'react';
import {Button, Col} from 'reactstrap';
import './SearchInput.scss'
import PropTypes from 'prop-types';
import DocumentDetail from '../home/DocumentDetail';

class SearchInput extends Component {

    constructor(props) {
        super(props);

        this.state = {
            query: ''
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSearch(e) {
        e.preventDefault();

        const { handleSearch } = { ...this.props };
        const { query } = { ...this.state };

        handleSearch(query);
    }

    handleInputChange(e) {
        const { value } = e.target;
        this.setState({ [e.target.name]: value });
    }

    render() {
        const { query } = { ...this.state };
        const { handleSearch } = { ...this.props };

        return (
            <form onSubmit={this.handleSearch} style={{width: '100%', display: 'flex'}}>
                <input className="search searchbar" type="search"
                       name="query"
                       value={query} onChange={this.handleInputChange}
                       placeholder="Search..." />
                <Button color="primary" type="submit">Search</Button>
                <svg className="icon-search"
                    aria-hidden="true" width="18"
                     height="18" viewBox="0 0 18 18">
                    <path
                        d="M18 16.5l-5.14-5.18h-.35a7 7 0 1 0-1.19 1.19v.35L16.5 18l1.5-1.5zM12 7A5 5 0 1 1 2 7a5 5 0 0 1 10 0z"></path>
                </svg>
            </form>

        );
    }
}

SearchInput.propTypes = {
    handleSearch: PropTypes.func.isRequired
};

export default SearchInput;
