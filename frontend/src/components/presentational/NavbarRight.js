import React from 'react';

class NavbarRight extends React.Component {

    render() {
        return (
            <ul className="nav navbar-nav navbar-right">
                {this.props.children}
            </ul>
        );
    }
}

export default NavbarRight;