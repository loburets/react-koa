import React from 'react';
import BaseInput from './BaseInput';
import PropTypes from "prop-types";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.getInputErrors = this.getInputErrors.bind(this);
    }

    getInputErrors(name) {
        let errors = [];

        this.props.errors.forEach((error) => {
            if (error.input !== name) {
                return;
            }
            errors.push(error);
        });

        return errors;
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <BaseInput handleInputChange={this.props.handleInputChange}
                           title={"First name"}
                           id={"register_input__first-name"}
                           type={"test"}
                           name={"firstName"}
                           placeholder={"First name"}
                           required={true}
                           value={this.props.inputs.firstName}
                           errors={this.getInputErrors('firstName')}
                />
                <BaseInput handleInputChange={this.props.handleInputChange}
                           title={"Last name"}
                           id={"register_input__last-name"}
                           type={"test"}
                           name={"lastName"}
                           placeholder={"Last name"}
                           required={true}
                           value={this.props.inputs.lastName}
                           errors={this.getInputErrors('lastName')}
                />
                <BaseInput handleInputChange={this.props.handleInputChange}
                           title={"Email address"}
                           id={"register_input__email"}
                           type={"email"}
                           name={"email"}
                           placeholder={"Enter email"}
                           required={true}
                           value={this.props.inputs.email}
                           errors={this.getInputErrors('email')}
                />
                <BaseInput handleInputChange={this.props.handleInputChange}
                           title={"Password"}
                           id={"register_input__pass"}
                           type={"password"}
                           name={"password"}
                           placeholder={"Password"}
                           required={true}
                           value={this.props.inputs.password}
                           errors={this.getInputErrors('password')}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}

Register.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    inputs: PropTypes.object.isRequired,
    errors: PropTypes.array.isRequired,
};

export default Register;