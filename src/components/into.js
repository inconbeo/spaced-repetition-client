import React from 'react';
import { Link } from 'react-router-dom';
import requiresLogin from './requires-login';
import {connect} from 'react-redux';

export class Intro extends React.Component {

    render () {
        console.log('checking count ne', this.props.questions)
        const styles = {textAlign: 'center', 'textDecoration': 'none', 'color':'black'}
        return (
            <div style={styles}>
                <h1>ARE YOU READY FOR THE LESSON ?</h1>
                <button onClick={() => this.fetchingquestions}><Link style={styles} to="/dashboard">Lets Start</Link></button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    count: state.protectedData.count,
    score: state.protectedData.score,
    time: state.protectedData.time,
    questions: state.auth.currentUser.questions
});
export default requiresLogin()(connect(mapStateToProps)(Intro));
