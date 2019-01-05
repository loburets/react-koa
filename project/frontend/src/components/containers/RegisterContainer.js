import { connect } from 'react-redux';

import Register from '../presentational/Register';
import withFormHandlers from './high-order/WithFormHandlers';
import {loginUser} from "../../actions";

const requestOptions = {
    method: 'POST',
};
const onSuccess = function (data) {
    // todo redirect on success
    this.props.dispatch(loginUser(data));
};

export default connect()(withFormHandlers(Register, '/api/v1/users', requestOptions, onSuccess));