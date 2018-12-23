import React from 'react';
import Login from '../presentational/Login';
import { connect } from 'react-redux';
import withFormHandlers from './high-order/WithFormHandlers';
import {loginUser} from "../../actions";

let requestOptions = {
    method: 'POST',
};
let onSuccess = function (data) {
    // todo redirect on success
    this.props.dispatch(loginUser(data));
};
let onError = function (error) {
    if (typeof error.response === 'undefined' || error.response.status !== 401) {
        throw error;
    }
    let message = 'Wrong email or password';

    this.setErrors([
        {
            field: 'password',
            message,
        },
    ]);
};

export default connect()(withFormHandlers(Login, '/api/v1/login', requestOptions, onSuccess, onError));