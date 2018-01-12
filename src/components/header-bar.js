import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import {updateCount} from '../actions/protected-data';
import requiresLogin from './requires-login';

export class HeaderBar extends React.Component {
    logOut() {
        console.log('checking count ne', this.props.count)
        this.props.dispatch(updateCount(this.props.count,this.props.score,this.props.time));
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }
    
    render() {
        
        // Only render the log out button if we are logged in
        let logOutButton;
        if (this.props.loggedIn) {
            logOutButton = (
                <button className="logoutbutton" onClick={() => this.logOut()}>Log out</button>
            );
        }
        const style = {'textAlign': 'center'};
        return (
            <div className="header-bar" style={style}>
                <h1 className="headbar" >LEARNING VIETNAMESE THROUGH SPACE-REPETITION</h1>
                {logOutButton}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    count: state.protectedData.count,
    score: state.protectedData.score,
    time: state.protectedData.time
});

export default requiresLogin()(connect(mapStateToProps)(HeaderBar));
