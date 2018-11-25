import React from 'react';
import PropTypes from 'prop-types';

class BaseInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e) {
        this.props.handleInputChange(e);
    }

    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.id}>{this.props.title}</label>
                <input
                    type={this.props.type}
                    name={this.props.name}
                    className="form-control"
                    id={this.props.id}
                    placeholder={this.props.placeholder}
                    onChange={this.handleInputChange}
                    // required={Boolean(this.props.required)}
                    required={this.props.required}
                />
            </div>
        );
    }
}

BaseInput.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    required: PropTypes.bool,
};

export default BaseInput;