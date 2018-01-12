import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import './dashboard.css';
import LoginForm from './login-form';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/intro" />;
    }
    const style = {'textAlign':'center'}
    return (
        <div  style = {style} className="home">
            <h2 className="login-box">Welcome to Langu-Umbala!</h2>
            <LoginForm />
            <Link to="/register" className="registerAccountButton">Register</Link>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
