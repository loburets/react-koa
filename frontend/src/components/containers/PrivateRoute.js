import {
    Route,
    Redirect,
} from "react-router-dom";
import {connect} from "react-redux";
import React from "react";
import {withRouter} from 'react-router'

import routes from "../../routes";

class PrivateRoute extends React.Component {
    render() {
        const { component: Component, ...props } = this.props;
        return (
            <Route
                {...props}
                render={props =>
                    this.props.isLoggedIn ? (
                        <Component {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: routes.login,
                                state: { from: props.location }
                            }}
                        />
                    )
                }
            />
        );
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: typeof state.auth !== 'undefined' && typeof state.auth.id !== 'undefined',
});

export default withRouter(connect(
    mapStateToProps,
)(GuestRoute));