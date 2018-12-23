import React from 'react';
import '../styles/components/App.css';
import '../styles/base/base.scss'
import RegisterContainer from "./containers/RegisterContainer";
import LoginContainer from "./containers/LoginContainer";
import Nav from "./presentational/Nav";
import routes from "../routes";
import { Route } from "react-router-dom";
import RequestHelper from "../utils/RequestHelper";
import {loginUser} from "../actions";
import connect from "react-redux/es/connect/connect";
import GuestRoute from "./containers/GuestRoute";

class App extends React.Component {
    constructor(props) {
        super(props);
        fetch('/api/v1/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(RequestHelper.throwIfErrorStatus)
            .then(data => data.json())
            .then(data => {
                this.props.dispatch(loginUser(data));
            })
            .catch((error) => {
                // some unexpected error, throw it forward
                if (error.response && error.response.status !== 401) {
                    throw error;
                }
            });
    }

    render() {
        return (
            <div>
                <Nav />
                <div className="container">
                    <GuestRoute path={routes.sigUp} component={RegisterContainer}/>
                    <GuestRoute path={routes.login} component={LoginContainer}/>
                </div>
            </div>
        );
    }
}

export default connect()(App);