import React from 'react';
import { Link } from 'react-router-dom';

export default class Intro extends React.Component {
    render () {
        const styles = {textAlign: 'center', 'textDecoration': 'none', 'color':'black'}
        return (
            <div style={styles}>
                <h1>ARE YOU READY FOR THE LESSON ?</h1>
                <button><Link style={styles} to="/dashboard">Lets Start</Link></button>
            </div>
        )
    }
}