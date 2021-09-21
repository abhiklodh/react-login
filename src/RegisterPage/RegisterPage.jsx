import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

var checkUsername, checkNumber, checkPassword, checkName = true;

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                name: '',
                number: '',
                username: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.nameChange = this.nameChange.bind(this);
        this.numberChange = this.numberChange.bind(this);
        this.usernameChange = this.usernameChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    nameChange(event) {
        console.log(event.target.value);
        const nameRegex = /^(([A-za-z]+[\s]{1}[A-za-z]+)|([A-Za-z]+))$/g;
        
        if (!nameRegex.test(event.target.value)) {
            console.log("Invalid name");
            checkName = false;
        } else {
            console.log("Valid name");
            checkName = true;
        }
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    numberChange(event) {
        console.log(event.target.value);
        const numberRegex = /^[1-9]{9}[0-9]$/g;

        if (!numberRegex.test(event.target.value)) {
            console.log("Invalid number");
            checkNumber = false;
        } else {
            console.log("Valid number");
            checkNumber = true;
        }

        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    usernameChange(event) {
        console.log(event.target.value);
        const emailRegex = /\S+@\S+\.\S+/;

        if (!emailRegex.test(event.target.value)) {
            console.log("Invalid email");
            checkUsername = false;
        } else {
            console.log("Valid email");
            checkUsername = true;
        }

        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    passwordChange(event) {
        console.log(event.target.value);
        const passwordRegex = /^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/g;

        if (!passwordRegex.test(event.target.value)) {
            console.log("Invalid password");
            checkPassword = false;
        } else {
            console.log("Valid password");
            checkPassword = true;
        }

        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;

        const emailRegex = /\S+@\S+\.\S+/;

        if (!emailRegex.test(user.username)) {
            console.log("Invalid email");
            checkUsername = false;
        } else {
            console.log("Valid email");
            checkUsername = true;
        }

        const passwordRegex = /^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/g;

        if (!passwordRegex.test(user.password)) {
            console.log("Invalid password");
            checkPassword = false;
        } else {
            console.log("Valid password");
            checkPassword = true;
        }

        const numberRegex = /[1-9]\d{9}/g;

        if (!numberRegex.test(user.number)) {
            console.log("Invalid number");
            checkNumber = false;
        } else {
            console.log("Valid number");
            checkNumber = true;
        }

        const nameRegex = /^(([A-za-z]+[\s]{1}[A-za-z]+)|([A-Za-z]+))$/g;
        
        if (!nameRegex.test(user.name)) {
            console.log("Invalid name");
            checkName = false;
        } else {
            console.log("Valid name");
            checkName = true;
        }

        if (user.name && user.number && user.username && user.password && checkName && checkNumber && checkPassword && checkUsername) {
            this.props.register(user);
        }
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return (
            <div className="login-wrapper my-auto">
                <div style={{textAlign: "center"}}>
                    <h3>Welcome!</h3>
                    <p>Please create your account.</p>
                    <br /><br />
                </div>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !user.name ? ' has-error' : '') + (submitted && !checkName ? ' has-error' : '')}>
                        <input type="text" className="form-control" placeholder="Name" name="name" value={user.name} onChange={this.nameChange} />
                        {submitted && !user.name &&
                            <div className="help-block">Name is required</div>
                        }
                        {submitted && !checkName && user.name &&
                            <div className="help-block">Name is invalid</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.number ? ' has-error' : '') + (submitted && !checkNumber ? ' has-error' : '')}>
                        <input type="text" className="form-control" placeholder="Mobile Number" name="number" value={user.number} onChange={this.numberChange} />
                        {submitted && !user.number &&
                            <div className="help-block">Mobile Number is required</div>
                        }
                        {submitted && !checkNumber && user.number &&
                            <div className="help-block">Mobile Number is invalid</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.username ? ' has-error' : '') + (submitted && !checkUsername ? ' has-error' : '')}>
                        <input type="text" className="form-control" placeholder="Email ID" name="username" value={user.username} onChange={this.usernameChange} />
                        {submitted && !user.username &&
                            <div className="help-block">Email ID is required</div>
                        }
                        {submitted && !checkUsername && user.username &&
                            <div className="help-block">Email ID is invalid</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')+ (submitted && !checkPassword ? ' has-error' : '')}>
                        <input type="password" className="form-control" placeholder="Password" name="password" value={user.password} onChange={this.passwordChange} />
                        {submitted && !user.password &&
                            <div className="help-block">Password is required</div>
                        }
                        {submitted && !checkPassword && user.password &&
                            <div className="help-block">Password must be atleast 8 characters long and contain atleast one upper case letter, one lower case letter, one special character and one number.</div>
                        }
                    </div>
                    <br /><br />
                    <div className="form-group">
                        <button className="btn btn-block login-btn">Register</button>
                        {registering}
                        <br />
                        <p className="login-wrapper-footer-text">Already have an account? <Link to="/login" className="text-reset">Login</Link></p>
                    </div>
                </form>
                <div className="row"><div className="col-md-12"><footer style={{textAlign: "center", cursor: "pointer", marginTop: "2rem"}}>Terms of use. Privacy policy</footer></div></div>
            </div>
        );
    }
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };