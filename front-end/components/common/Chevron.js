import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types';
import DocumentDetail from '../home/DocumentDetail';

class Chevron extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { isAscending } = { ...this.props };
        return (
            <Fragment>
                { isAscending && (
                    <svg x="0px" y="0px" viewBox="0 0 256 256" style={{position: 'relative', bottom: '2px',height: '10px', width: '10px'}}>
                        <g>
                            <g>
                                <polygon points="128,48.907 0,176.907 30.187,207.093 128,109.28 225.813,207.093 256,176.907"/>
                            </g>
                        </g>
                    </svg>
                )}
                { !isAscending && (
                    <svg x="0px" y="0px" viewBox="0 0 256 256" style={{position: 'relative', bottom: '2px',height: '10px', width: '10px'}}>
                        <g>
                            <g>
                                <polygon points="225.813,48.907 128,146.72 30.187,48.907 0,79.093 128,207.093 256,79.093"/>
                            </g>
                        </g>
                    </svg>
                )}
            </Fragment>
        );
    }
}

Chevron.propTypes = {
    isAscending: PropTypes.bool
};

Chevron.defaultProps = {
    isAscending: true
};

export default Chevron;
