import React from 'react';
import BaseInput from './BaseInput';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    // todo use HOC or compostition something to use in other forms
    handleSubmit(event) {
        console.log('Form was submitted: ',  this.state);
        event.preventDefault();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <BaseInput handleInputChange={this.handleInputChange}
                           title={"Email address"}
                           id={"register_input__email"}
                           type={"email"}
                           name={"email"}
                           placeholder={"Enter email"}
                           required={true}
                />
                <BaseInput handleInputChange={this.handleInputChange}
                           title={"Password"}
                           id={"register_input__pass"}
                           type={"password"}
                           name={"password"}
                           placeholder={"Password"}
                           required={true}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}

export default Register;