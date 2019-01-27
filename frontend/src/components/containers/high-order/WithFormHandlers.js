import React from 'react';

import RequestHelper from "../../../utils/RequestHelper";

export default (WrappedComponent, url, requestOptions = {}, onSuccess = ()=>{}, onError = (error)=>{throw error}) => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.handleInputChange = this.handleInputChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.setErrors = this.setErrors.bind(this);
            this.state = {
                inputs: {},
                // separate array because one field can have few errors
                errors: []
            };
        }

        handleSubmit(event) {
            fetch(url, {
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.inputs),
                ...requestOptions
            })
                // reset errors from the last call if they exist
                .then((data) => {
                    this.setState({errors: []});
                    return data
                })
                .then(RequestHelper.throwIfErrorStatus)
                .then(data => data.json())
                .then(onSuccess)
                .catch((error) => {
                    // some js error, throw it forward
                    if (!error.response) {
                        throw error;
                    }
                    // not the validation error, connection error, not found etc
                    if (error.response.status !== 422) {
                        throw error;
                    }
                    return error.response.json().then(this.setErrors);
                })
                .catch(onError);

            event.preventDefault();
        }

        setErrors(data) {
            const errors = [];
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

        // todo: add display name wrapping: https://reactjs.org/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging
        render() {
            let errors = this.props.customErrors ? this.state.errors.concat(this.props.customErrors) : this.state.errors;

            return <WrappedComponent
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
                inputs={this.state.inputs}
                errors={errors}
                {...this.props}
            />;
        }
    };
}