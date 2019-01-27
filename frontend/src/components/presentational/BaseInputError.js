import React from 'react';
import PropTypes from 'prop-types';

class BaseInputError extends React.Component {
    render() {
        return (
            <span className="help-block">
                <strong>{this.props.message}</strong>
            </span>
        );
    }
}

BaseInputError.propTypes = {
    message: PropTypes.string.isRequired,
};

export default BaseInputError;