import React from 'react';
import RequestHelper from '../../utils/RequestHelper';
import Register from '../presentational/Register';

class RegisterContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setErrors = this.setErrors.bind(this);
        this.state = {
            inputs: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
            },
            errors: []
        };
    }

    // todo use HOC or composition or something to use in other forms
    handleSubmit(event) {
        fetch('/api/v1/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.inputs)
        })
            // reset errors from the last call if they exist
            .then((data) => {
                this.setState({errors: []});
                return data
            })
            .then(RequestHelper.throwIfErrorStatus)
            .then(data => data.json())
            // todo save to redux
            .then(data => console.log(data))
            .catch((error) => {
                if (!error.response || error.response.status !== 422) {
                    return [];
                }
                return error.response.json().then(this.setErrors);
            });

        event.preventDefault();
    }

    setErrors(data) {
        let errors = [];
        data.forEach((error) => errors.push({input:error.field, message:error.message}));
        this.setState({errors});
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
            <Register
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
                inputs={this.state.inputs}
                errors={this.state.errors}
            />
        );
    }
}

export default RegisterContainer;