import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Breadcrumb, BreadcrumbItem, ListGroup, ListGroupItem} from 'reactstrap';

class Profile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { account, goBack } = { ...this.props };

        return (
            <div className="main-content">
                <Breadcrumb>
                    <BreadcrumbItem className="breadcrumb-link" onClick={goBack}>My Documents</BreadcrumbItem>
                    <BreadcrumbItem active>Profile</BreadcrumbItem>
                </Breadcrumb>
                <ListGroup>
                    <ListGroupItem className="justify-content-between">
                        <img className="shared-with-image-single"
                             src={account.profileimgUrl}
                             alt="profile"
                        />
                        <div style={{marginLeft: '24px',display: 'inline-block'}}>
                            {`${account.firstName} ${account.lastName}`}
                        </div>
                    </ListGroupItem>
                </ListGroup>
            </div>
        )
    }
}

Profile.propTypes = {
    account: PropTypes.shape({
        profileimgUrl: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        accountId: PropTypes.string
    }),
    goBack: PropTypes.func.isRequired
};

export default Profile;
