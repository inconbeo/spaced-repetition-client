import {
    FETCH_PROTECTED_DATA_SUCCESS,
    FETCH_PROTECTED_DATA_ERROR,
    SUBMIT_CORRECT_ANSWER,
    SUBMIT_WRONG_ANSWER,
    RESET_QUESTIONS,
    START_OVER
} from '../actions/protected-data';

const initialState = {
    data: [],
    loading: false,
    error: null,
    answer: null,
    count: 0,
    score: 0,
    time: 0
};

export default function reducer(state = initialState, action) {
    if (action.type === FETCH_PROTECTED_DATA_SUCCESS) {
        return Object.assign({}, state, {
            data: action.data,
            loading: false,
            error: null
        });
    } else if (action.type === FETCH_PROTECTED_DATA_ERROR) {
        return Object.assign({}, state, {
            error: action.error,
            loading:false
        });
    }
    else if (action.type === SUBMIT_CORRECT_ANSWER) {
        return Object.assign({}, state, {
            answer: action.answer,
            count: state.count + 1,
            score: state.score + 1,
            time: state.time + 1
        })
    }

    else if (action.type === SUBMIT_WRONG_ANSWER) {
        return Object.assign({}, state, {
            answer: action.answer,
            count: state.count + 1,
            time: state.time + 1
        })
    }
    else if(action.type === RESET_QUESTIONS) {
        return Object.assign({}, state, {
            count: 0,
            answer: action.answer
        })
    }
    else if(action.type === START_OVER) {
        return Object.assign({}, state, {
            data: [],
            loading: false,
            error: null,
            answer: null,
            count: 0,
            score: 0,
            time: 0
        })
    }
    return state;
}
