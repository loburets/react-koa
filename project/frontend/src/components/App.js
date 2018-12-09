import React from 'react';
import '../styles/components/App.css';
import '../styles/base/base.scss'
import RegisterContainer from "./containers/RegisterContainer";
import Nav from "./presentational/Nav";
import routes from "../routes";
import { Route } from "react-router-dom";

class App extends React.Component {
    render() {
        return (
            <div>
                <Nav />
                <div className="container">
                    <Route path={routes.sigUp} component={RegisterContainer}/>
                </div>
            </div>
        );
    }
}

export default App;