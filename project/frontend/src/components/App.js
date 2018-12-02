import React from 'react';
import '../styles/components/App.css';
import '../styles/base/base.scss'
import RegisterContainer from "./containers/RegisterContainer";
import Nav from "./presentational/Nav";

class App extends React.Component {
    render() {
        return (
            <div>
                <Nav />
                <div className="container">
                    <RegisterContainer />
                </div>
            </div>
        );
    }
}

export default App;