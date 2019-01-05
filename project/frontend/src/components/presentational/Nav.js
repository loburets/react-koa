import React from 'react';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";

import routes from "../../routes";
import NavbarRight from "./NavbarRight";
import RequestHelper from "../../utils/RequestHelper";
import {logout} from "../../actions";

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.handleRightDropdownChange = this.handleRightDropdownChange.bind(this);
        this.handleCollapsedNavbar = this.handleCollapsedNavbar.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.state = {
            rightDropdownIsOpened: false,
            collapsedNavbarIsOpened: false,
        };
    }

    handleRightDropdownChange() {
        this.setState({rightDropdownIsOpened: !this.state.rightDropdownIsOpened});
    }

    handleCollapsedNavbar() {
        this.setState({collapsedNavbarIsOpened: !this.state.collapsedNavbarIsOpened});
    }

    handleLogout() {
        fetch('/api/v1/logout', {
            method: 'POST',
        })
            .then(RequestHelper.throwIfErrorStatus)
            .then(() => {
                this.props.dispatch(logout());
                this.setState({rightDropdownIsOpened: false})
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
            <nav className="navbar navbar-default">
                <div className="container">
                    <div className="navbar-header">

                        <button type="button" className="navbar-toggle collapsed" onClick={this.handleCollapsedNavbar}>
                            <span className="sr-only">Toggle Navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>

                        <Link className="navbar-brand" to="/">Social Network</Link>
                    </div>

                    <div className="collapse navbar-collapse" style={{display: this.state.collapsedNavbarIsOpened ? 'block' : 'none' }}>
                        <ul className="nav navbar-nav">
                            <li><Link to="/">Home</Link></li>
                        </ul>

                        {!this.props.isLoggedIn ? (
                            <NavbarRight>
                                <li key="Sign In"><Link to={routes.login}>Sign In</Link></li>
                                <li key="Sign Up"><Link to={routes.sigUp}>Sign Up</Link></li>
                            </NavbarRight>
                        ) : (
                            <NavbarRight>
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" role="button"
                                        onClick={this.handleRightDropdownChange}
                                    >
                                        {this.props.firstName} {this.props.lastName} <span className="caret"></span>
                                    </a>

                                    <ul className="dropdown-menu" role="menu"
                                        style={{display: this.state.rightDropdownIsOpened ? 'block' : 'none' }}
                                    >
                                        <li>
                                            <a href="#" onClick={this.handleLogout}>
                                                <i className="fa fa-btn fa-sign-out"></i>
                                                Logout
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </NavbarRight>
                        )}
                    </div>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: typeof state.auth !== 'undefined' && typeof state.auth.id !== 'undefined',
    firstName: typeof state.auth !== 'undefined' && state.auth.firstName,
    lastName: typeof state.auth !== 'undefined' && state.auth.lastName,
});

export default connect(
    mapStateToProps,
)(Nav);