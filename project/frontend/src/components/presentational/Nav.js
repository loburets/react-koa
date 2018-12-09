import React from 'react';
import { connect } from 'react-redux'

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

                        <a className="navbar-brand" href="/">
                            Social Network
                        </a>
                    </div>

                    <div className="collapse navbar-collapse" style={{display: this.state.collapsedNavbarIsOpened ? 'block' : 'none' }}>
                        <ul className="nav navbar-nav">
                            <li><a href="/">Home</a></li>
                        </ul>

                        <ul className="nav navbar-nav navbar-right" onClick={this.handleRightDropdownChange}>
                            {!this.props.isLoggedIn ? (
                                <li><a href="/">Login</a></li>
                            ) : (
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" role="button">
                                        Vasya <span className="caret"></span>
                                    </a>

                                    <ul className="dropdown-menu" role="menu" style={{display: this.state.rightDropdownIsOpened ? 'block' : 'none' }}>
                                        <li><a href="/"><i className="fa fa-btn fa-sign-out"></i>Logout</a></li>
                                    </ul>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state) => ({
    // todo: use /me api point for initial state and routing
    // isLoggedIn: typeof state.auth !== undefined && typeof state.id !== undefined,
    isLoggedIn: true,
});

export default connect(
    mapStateToProps,
)(Nav);