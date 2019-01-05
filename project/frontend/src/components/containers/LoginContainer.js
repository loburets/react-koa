import React from 'react';
import { connect } from 'react-redux';

import Login from '../presentational/Login';
import withFormHandlers from './high-order/WithFormHandlers';
import {loginUser} from "../../actions";

const requestOptions = {
    method: 'POST',
};
const onSuccess = function (data) {
    // todo redirect on success
    this.props.dispatch(loginUser(data));
};
const onError = function (error) {
    if (typeof error.response === 'undefined' || error.response.status !== 401) {
        throw error;
    }
    // todo get from response
    const message = 'Wrong email or password';

    this.setErrors([
        {
            field: 'password',
            message,
        },
    ]);
};

export default connect()(withFormHandlers(Login, '/api/v1/login', requestOptions, onSuccess, onError));