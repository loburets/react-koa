import React from 'react';
import Register from './Register';
import '../styles/components/App.css';
import '../styles/base/base.scss'

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <Register />
            </div>
        );
    }
}

export default App;