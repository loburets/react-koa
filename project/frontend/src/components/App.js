import React from 'react';
import '../styles/components/App.css';
import '../styles/base/base.scss'
import RegisterContainer from "./containers/RegisterContainer";

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <RegisterContainer />
            </div>
        );
    }
}

export default App;