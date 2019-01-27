import { connect } from 'react-redux';
import React from "react";

import Register from '../presentational/Register';
import withFormHandlers from './high-order/WithFormHandlers';
import {loginUser} from "../../actions";

const requestOptions = {
    method: 'POST',
};

let RegisterWithFormHandlers;

class RegisterContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {customErrors: []};
        this.onSuccess = this.onSuccess.bind(this);
        RegisterWithFormHandlers = withFormHandlers(Register, '/api/v1/users', requestOptions, this.onSuccess);
    }

    onSuccess(data) {
        this.props.dispatch(loginUser(data));
    }

    render() {
        return (
            <RegisterWithFormHandlers/>
        );

    }
}

export default connect()(RegisterContainer);