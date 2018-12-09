import React from 'react';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import routes from "../../routes";
import NavbarRight from "./NavbarRight";

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.handleRightDropdownChange = this.handleRightDropdownChange.bind(this);
        this.handleCollapsedNavbar = this.handleCollapsedNavbar.bind(this);
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
                                <li key="Sign In"><Link to="/">Sign In</Link></li>
                                <li key="Sign Up"><Link to={routes.sigUp}>Sign Up</Link></li>
                            </NavbarRight>
                        ) : (
                            <NavbarRight>
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" role="button"
                                        onClick={this.handleRightDropdownChange}
                                    >
                                        Vasya <span className="caret"></span>
                                    </a>

                                    <ul className="dropdown-menu" role="menu"
                                        style={{display: this.state.rightDropdownIsOpened ? 'block' : 'none' }}
                                    >
                                        <li><Link to="/"><i className="fa fa-btn fa-sign-out"></i>Logout</Link></li>
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
    // todo: use /me api point for initial state
    isLoggedIn: typeof state.auth !== 'undefined' && typeof state.auth.id !== 'undefined',
});

export default connect(
    mapStateToProps,
)(Nav);