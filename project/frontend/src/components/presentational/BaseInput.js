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
        const errors = this.props.errors.map((error, index) =>
            <span key={index} className="help-block">
                <strong>{error.message}</strong>
            </span>
        );

        return (
            <div className={"form-group " + (this.props.errors.length ? 'has-error' : '')}>
                <label htmlFor={this.props.id}>{this.props.title}</label>
                <input
                    type={this.props.type}
                    name={this.props.name}
                    className="form-control"
                    id={this.props.id}
                    placeholder={this.props.placeholder}
                    onChange={this.handleInputChange}
                    required={this.props.required}
                    value={this.props.value}
                />
                {errors}
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
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    value: PropTypes.any,
    errors: PropTypes.array,
};

export default BaseInput;