import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';

class DocumentDetail extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { document, goBack } = { ...this.props };
        return (
            <div>
                <Breadcrumb>
                    <BreadcrumbItem className="breadcrumb-link" onClick={goBack}>My Documents</BreadcrumbItem>
                    <BreadcrumbItem active>Driver's License</BreadcrumbItem>
                </Breadcrumb>
                <img className="document-summary-image"
                     src={document.url}
                     alt="document"
                />
                <div>{document.type}</div>
                <div>SHARED WITH</div>
                { document.sharedWith.map((sharedWithItem, idx) => {
                    return (
                        <div key={idx}>
                            <img className="shared-with-image"
                                 src={sharedWithItem.profileimgUrl}
                                 alt={`sharedWithItem${idx}`}
                            />
                        </div>
                    )
                }) }
            </div>
        )
    }
}

DocumentDetail.propTypes = {
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
    goBack: PropTypes.func.isRequired
};

export default DocumentDetail;
