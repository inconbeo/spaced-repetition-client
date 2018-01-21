import React from 'react';
import { Link } from 'react-router-dom';
import requiresLogin from './requires-login';
import {connect} from 'react-redux';
import {fetchAddList, transferQuestions, fetchingQuestion} from '../actions/protected-data';

export class Intro extends React.Component {
    componentDidMount() {
        if (this.props.linklist==='') {
            this.props.dispatch(fetchAddList())
            .then(() => this.props.dispatch(transferQuestions()))
            .then(() => this.props.dispatch(fetchingQuestion()))
            
        }
        else {
            return
        }
        }

        
    render () {
        const upper = this.props.name.toUpperCase();
        console.log(this.props.linklist)
        console.log('checking count ne', this.props.questions)
        const styles = {textAlign: 'center', 'textDecoration': 'none'}
        return (
            <div style={styles}>
                <h1 className="ready">ARE YOU READY FOR THE LESSON, {upper}?</h1>
                <button className="start" ><Link className="startbutton" style={styles} to="/dashboard">Let's Start</Link></button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    count: state.protectedData.count,
    score: state.protectedData.score,
    time: state.protectedData.time,
    questions: state.auth.currentUser.questions,
    linklist: state.auth.currentUser.linklist,
    name: state.auth.currentUser.firstName
});
export default requiresLogin()(connect(mapStateToProps)(Intro));
