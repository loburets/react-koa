import React from 'react';
import BaseInput from './BaseInput';
import RequestHelper from '../utils/RequestHelper';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            inputs: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
            },
            errors: {}
        };
    }

    setErrors(data) {
        let errors = [];
        data.forEach((error) => errors.push({input:error.field, message:error.message}));
        this.setState({errors});
    };

    // todo use HOC or composition to use in other forms
    handleSubmit(event) {
        fetch('/api/v1/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.inputs)
        })
            .then(() => {this.setState({errors: {}})})
            .then(RequestHelper.throwIfErrorStatus)
            .then(data => data.json())
            .then(data => console.log(data))
            .catch(error => error.response.json())
            .then(data => this.setErrors(data))

        event.preventDefault();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            inputs: {...this.state.inputs, [name]: value}
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <BaseInput handleInputChange={this.handleInputChange}
                           title={"First name"}
                           id={"register_input__first-name"}
                           type={"test"}
                           name={"firstName"}
                           placeholder={"First name"}
                           required={true}
                           value={this.state.firstName}
                />
                <BaseInput handleInputChange={this.handleInputChange}
                           title={"Last name"}
                           id={"register_input__last-name"}
                           type={"test"}
                           name={"lastName"}
                           placeholder={"Last name"}
                           required={true}
                           value={this.state.lastName}
                />
                <BaseInput handleInputChange={this.handleInputChange}
                           title={"Email address"}
                           id={"register_input__email"}
                           type={"email"}
                           name={"email"}
                           placeholder={"Enter email"}
                           required={true}
                           value={this.state.email}
                />
                <BaseInput handleInputChange={this.handleInputChange}
                           title={"Password"}
                           id={"register_input__pass"}
                           type={"password"}
                           name={"password"}
                           placeholder={"Password"}
                           required={true}
                           value={this.state.password}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}

export default Register;