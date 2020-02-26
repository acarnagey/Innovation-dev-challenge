import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import './DocumentSummary.scss';

class DocumentSummary extends Component {

    constructor(props) {
        super(props);
    }

    renderFirstShare(sharedWithList) {
        if(sharedWithList.length > 0) {
            const sharedWithItem = sharedWithList[0];
            return (
                <Fragment>
                    <img className="shared-with-image"
                         src={sharedWithItem.profileimgUrl}
                         alt="sharedWithItemFirst"
                    />
                    { sharedWithList.length === 1 && <span className="padding-right-24"/>}
                </Fragment>

            )
        }
        return (
            <div className="shared-with-other">0</div>
        )
    }

    renderOtherShare(sharedWithList) {
        if(sharedWithList.length === 2) {
            const sharedWithItem = sharedWithList[1];
            return (
                <img className="shared-with-other"
                     src={sharedWithItem.profileimgUrl}
                     alt="sharedWithItemFirst"
                />
            )
        }
        if(sharedWithList.length > 2) {
            return (
                <div className="shared-with-other">+{sharedWithList.length - 1}</div>
            )
        }
        return (
            <Fragment/>
        )
    }

    render() {
        const { document, documentIdx } = { ...this.props };
        return (
            <div>
                <img className="document-summary-image"
                    src={document.url}
                    alt={`document${documentIdx}`}
                />
                <div className="title padding-top-12">{document.type}</div>
                <div className="subtitle">SHARED WITH</div>
                <div className="shared-with-container padding-top-12">
                    { this.renderFirstShare(document.sharedWith) }
                    { this.renderOtherShare(document.sharedWith) }
                    <div className="separator" />
                    <div className="document-idx">{documentIdx + 1}</div>
                </div>
            </div>
        )
    }
}

DocumentSummary.propTypes = {
    document: PropTypes.shape({
        type: PropTypes.string,
        url: PropTypes.string,
        sharedWith: PropTypes.arrayOf(PropTypes.shape({
            profileimgUrl: PropTypes.string,
            firstName: PropTypes.string,
            lastName: PropTypes.string,
            accountId: PropTypes.string,
        }))
    }),
    documentIdx: PropTypes.number
};

export default DocumentSummary;
