import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

var isValid = true;

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });

        const emailRegex = /\S+@\S+\.\S+/;

        if (!emailRegex.test(value)) {
            console.log("Invalid email");
            isValid = false;
            return false; // Invalid email
        } else {
            console.log("Valid email");
            isValid = true;
            return true;
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.props.login(username, password);
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;

        return (
            <div className="login-wrapper my-auto">
                <div style={{textAlign: "center"}}>
                    <h3>Welcome back!</h3>
                    <p>Please login to your account.</p>
                    <br /><br />
                </div>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '') + (submitted && !isValid ? ' has-error' : '')}>
                        <input type="text" className="form-control" placeholder="Username" name="username" value={username} onChange={this.handleChange} />
                        {submitted && !username &&
                            <div className="help-block">Email ID is required</div>
                        }
                        {/*
                        {submitted && !isValid &&
                            <div className="help-block">Email ID is invalid</div>
                        }
                        */}
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <input type="password" className="form-control" placeholder="Password" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <br />
                    <div className="row">
                        <div style={{textAlign: "left"}} className="col-md-6">
                        <input type="checkbox" id="remember" name="remember" value="" />
                        <label style={{color: "#080808",
                            fontSize: "14px",
                            marginBottom: "54px",
                            fontWeight: "200",
                            cursor: "pointer"
                        }}>Remember me</label>
                        </div>
                        <div style={{textAlign: "right"}} className="col-md-6">
                            <a href="#" className="forgot-password-link">Forgot password</a>
                        </div>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block login-btn">Login</button>
                        {loggingIn}
                        <br />
                        <p className="login-wrapper-footer-text">Don't have an account? <Link to="/register" className="text-reset">Register here</Link></p>
                        
                    </div>
                </form>
                <div className="row"><div className="col-md-12"><footer style={{textAlign: "center", cursor: "pointer", marginTop: "6rem"}}>Terms of use. Privacy policy</footer></div></div>
            </div>
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };