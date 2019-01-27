import {
    Route,
    Redirect,
} from "react-router-dom";
import {connect} from "react-redux";
import React from "react";
import {withRouter} from 'react-router'

import routes from "../../routes";

class GuestRoute extends React.Component {
    render() {
        const { component: Component, ...props } = this.props;
        return (
            <Route
                {...props}
                render={props =>
                    this.props.isLoggedIn ? (
                        <Redirect
                            to={{
                                pathname: routes.home,
                                state: { from: props.location }
                            }}
                        />
                    ) : (
                        <Component {...props} />
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