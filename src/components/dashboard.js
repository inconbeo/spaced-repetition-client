import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchProtectedData, submitCorrectAnswer, submitWrongAnswer, resetQuestions, startOver} from '../actions/protected-data';

export class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchProtectedData());
    }

    submitAnswer(event) {
        event.preventDefault();
        const value = this.input.value;
        console.log(value);
        const actual = this.props.data.map((question, index) => (
            question[0].answer
      ))
      if (!value) {
          return
      }
        if (value===actual[this.props.count]) {
        this.props.dispatch(submitCorrectAnswer(value));
        }
        else {
        this.props.dispatch(submitWrongAnswer(value));
        }
        this.input.value = '';
    }

    playAgain() {
        this.props.dispatch(resetQuestions(this.props.answer));
        this.props.dispatch(fetchProtectedData());
    }

    startAgain() {
        this.props.dispatch(startOver());
        this.props.dispatch(fetchProtectedData());
    }
    render() {
        const actual = this.props.data.map((question, index) => (
              question[0].answer
        ))
        const questions = this.props.data.map((question, index) => (
            <div key={index}>{question[0].question}</div>
        ))
        let answer, correctAnswer;
            if (!this.props.answer) {
                answer = <p></p>
                correctAnswer = <p></p>
            }
            else if (this.props.count===actual.length && this.props.answer===actual[actual.lengt-1]) {
                console.log(actual[actual.lengt-1])
                answer = <p>This is Correct</p>
                correctAnswer = <p></p>
                this.playAgain();
            }
            else if (this.props.count===actual.length && this.props.answer!==actual[actual.lengt-1]) {
                answer = <p>This is Incorrect</p>
                correctAnswer = <p>The correct answer is: {actual[actual.length-1]}</p>
                this.playAgain();
             }
            else if (this.props.answer!==actual[actual.length-1] && this.props.count===0) {
                answer = <p>This is Incorrect</p>
                correctAnswer = <p>The correct answer is: {actual[actual.length-1]}</p>
            }
            else if (this.props.answer===actual[actual.length-1] && this.props.count===0) {
                answer = <p>This is Correct</p>
                correctAnswer = <p></p>
            }
            else if (this.props.answer===actual[this.props.count-1]) {
                answer = <p>This is Correct</p>
                correctAnswer = <p></p>
            }
            else {
                answer = <p>This is Incorrect</p>
                correctAnswer = <p>The correct answer is: {actual[this.props.count-1]}</p>
            }
            console.log(this.props.count)
            console.log(this.props.data)
            console.log(this.props.answer)
            console.log(actual[actual.length-1])
                    
        
        const styles = {'textAlign' : 'center'}
      
    return (
        <div className="cheese" style={styles}>
        <h1>What do these words mean in English:</h1>
            <div>
                <h3><p>{questions[this.props.count]}</p></h3>
                <form onSubmit={e => this.submitAnswer(e)}>
                        <input placeholder="What does it mean ?" type="text" ref={input => this.input = input}/>
                        <input  type="submit" className="button" name="submit"/>
                        <button type="button" onClick={() => this.startAgain()}>Start Over</button>
                </form>
                
                {answer}
                <div>{correctAnswer}</div>
                <p>Your Score: {this.props.score}/{this.props.time}</p>
                
                {/* {againButton} */}
            </div>
        </div>
    )
}
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        data: state.protectedData.data,
        loading: state.protectedData.loading,
        error: state.protectedData.error,
        answer: state.protectedData.answer,
        result: state.protectedData.cheeses,
        count: state.protectedData.count,
        score: state.protectedData.score,
        time: state.protectedData.time
    };
};
export default requiresLogin()(connect(mapStateToProps)(Dashboard));



