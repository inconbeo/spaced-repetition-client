import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {reset, transferQuestions,fetchingQuestion, postingAnswer, fetchCount, submitCorrectAnswer, submitWrongAnswer, startOver} from '../actions/protected-data';
import './dashboard.css';
export class Dashboard extends React.Component {
    componentDidMount() {
        if (this.props.head===null) {
            this.props.dispatch(fetchingQuestion());
        }
            this.props.dispatch(fetchCount());
     }
    
    submitAnswer(event) {
        event.preventDefault();
        const value = this.input.value;
        console.log(value);
        console.log('THIS IS THE ANSWER', this.props.answerll)
    
      if (!value) {
          return
      }
        if (value===this.props.answerll) {
        this.props.dispatch(submitCorrectAnswer(value));
        }
        else {
        this.props.dispatch(submitWrongAnswer(value));
        }
        this.input.value = '';
        this.props.dispatch(postingAnswer(value))
     }
    
     startAgain() {
        this.props.dispatch(startOver());
        this.props.dispatch(transferQuestions())
        this.props.dispatch(fetchingQuestion());
        this.props.dispatch(fetchingQuestion());
        this.props.dispatch(fetchingQuestion());
    }

    nextQuestion() {
        this.props.dispatch(reset())
        this.props.dispatch(fetchingQuestion());
    }

    render() {
        let answer, correctAnswer;
            if (!this.props.answer) {
                answer = <p></p>
                correctAnswer = <p></p>
            }
            else if (this.props.answer===this.props.answerll) {
                //this.score()
                answer = <p className="answer">This is Correct</p>
                correctAnswer = <p></p>
            }
            else {
                answer = <p className="answer" >This is Incorrect</p>
                correctAnswer = <p>The correct answer is: {this.props.answerll}</p>
            }
           
            console.log('checking linkedlist answer', this.props.answerll)
            console.log(this.props.answer); 
            console.log(this.props.data); 
              
        
        const styles = {'textAlign' : 'center'}
       
      
    return (
        <div className="cheese" style={styles}>
        <h1 className="meaning">What do these words mean in English:</h1>
            <div>
                <h3 className="questions"><p>{this.props.question}</p></h3>
                <form className="box-input" onSubmit={e => this.submitAnswer(e)}>
                        <input className="holder" placeholder="What does it mean ?" type="text" ref={input => this.input = input}/>
                        <br></br>
                        <div className="input-section">
                            <input  type="submit" className="submit" name="submit"/>
                            <button type="button" className="next" onClick={() => this.nextQuestion()}>Next</button>
                            <button type="button" className="over" onClick={() => this.startAgain()}>Start Over</button>
                        </div>
                        
                </form>
                <div className="ngan">
                {answer}
                <div className="answer" >{correctAnswer}</div>
                <p className="answer" >Your Score: {this.props.data.length}/{this.props.time}</p>
                </div>
            </div>
        </div>
    )
}
}

const mapStateToProps = state => {
    
    console.log('checking auth', state.auth)
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        data: state.protectedData.data,
        loading: state.protectedData.loading,
        error: state.protectedData.error,
        answer: state.protectedData.answer,
        score: state.protectedData.score,
        time: state.protectedData.time,
        questions: state.auth.currentUser.questions,
        countUser: state.auth.currentUser.count,
        question: state.auth.currentUser.linklist.head.value.question,
        answerll: state.auth.currentUser.linklist.head.value.answer,
        head: state.auth.currentUser.linklist.head
    };
};
export default requiresLogin()(connect(mapStateToProps)(Dashboard));



