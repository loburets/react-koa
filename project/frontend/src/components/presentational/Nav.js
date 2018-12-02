import React from 'react';

class Nav extends React.Component {
    render() {
        let isLoggedIn = false;

        return (
            <nav className="navbar navbar-default">
                <div className="container">
                    <div className="navbar-header">

                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#app-navbar-collapse">
                            <span className="sr-only">Toggle Navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>

                        <a className="navbar-brand" href="/">
                            Social Network
                        </a>
                    </div>

                    <div className="collapse navbar-collapse" id="app-navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li><a href="/">Home</a></li>
                        </ul>

                        <ul className="nav navbar-nav navbar-right">
                            {!isLoggedIn ? (
                                <li><a href="/">Login</a></li>
                            ) : (
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                                       aria-expanded="false">
                                        Vasya <span className="caret"></span>
                                    </a>

                                    <ul className="dropdown-menu" role="menu">
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

export default Nav;