import React from 'react';
import PropTypes from "prop-types";

import BaseInput from './BaseInput';
import FormHelper from "../../utils/FormHelper";

class Register extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <form onSubmit={this.props.handleSubmit}>
                        <BaseInput handleInputChange={this.props.handleInputChange}
                                   title="First name"
                                   id="register_input__first-name"
                                   type="test"
                                   name="firstName"
                                   placeholder="First name"
                                   required
                                   value={this.props.inputs.firstName || ''}
                                   errors={FormHelper.getInputErrors('firstName', this.props.errors)}
                        />
                        <BaseInput handleInputChange={this.props.handleInputChange}
                                   title="Last name"
                                   id="register_input__last-name"
                                   type="test"
                                   name="lastName"
                                   placeholder="Last name"
                                   required
                                   value={this.props.inputs.lastName || ''}
                                   errors={FormHelper.getInputErrors('lastName', this.props.errors)}
                        />
                        <BaseInput handleInputChange={this.props.handleInputChange}
                                   title="Email address"
                                   id="register_input__email"
                                   type="email"
                                   name="email"
                                   placeholder="Enter email"
                                   required
                                   value={this.props.inputs.email || ''}
                                   errors={FormHelper.getInputErrors('email', this.props.errors)}
                        />
                        <BaseInput handleInputChange={this.props.handleInputChange}
                                   title="Password"
                                   id="register_input__pass"
                                   type="password"
                                   name="password"
                                   placeholder="Password"
                                   required
                                   value={this.props.inputs.password || ''}
                                   errors={FormHelper.getInputErrors('password', this.props.errors)}
                        />
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
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