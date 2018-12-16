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

export default connect()(withFormHandlers(Login, '/api/v1/login', requestOptions, onSuccess));