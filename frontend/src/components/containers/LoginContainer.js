import React from 'react';
import { connect } from 'react-redux';

import Login from '../presentational/Login';
import withFormHandlers from './high-order/WithFormHandlers';
import {loginUser} from "../../actions";
import {Redirect} from "react-router-dom";

const requestOptions = {
    method: 'POST',
};
let LoginWithFormHandlers;

class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {customErrors: []};
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
        LoginWithFormHandlers = withFormHandlers(Login, '/api/v1/login', requestOptions, this.onSuccess, this.onError);
    }

    onSuccess(data) {
        this.props.dispatch(loginUser(data));
    }

    async onError(error) {
        if (typeof error.response === 'undefined' || error.response.status !== 401) {
            throw error;
        }
        const data = await error.response.json();
        this.setState({customErrors: [{input:'password', message: data.message}]})
    }

    render() {
        return (
            <LoginWithFormHandlers customErrors={this.state.customErrors}/>
        );
    }
}

export default connect()(LoginContainer);