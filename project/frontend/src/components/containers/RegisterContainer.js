import React from 'react';
import Register from '../presentational/Register';
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

export default connect()(withFormHandlers(Register, '/api/v1/users', requestOptions, onSuccess));