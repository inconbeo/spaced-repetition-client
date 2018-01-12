import {
    FETCH_COUNT_ERROR,
    FETCH_COUNT_SUCCESS,
    FETCH_PROTECTED_DATA_SUCCESS,
    FETCH_PROTECTED_DATA_ERROR,
    SUBMIT_CORRECT_ANSWER,
    SUBMIT_WRONG_ANSWER,
    START_OVER,
    SCORE_RIGHT
} from '../actions/protected-data';

const initialState = {
    data: [],
    loading: false,
    error: null,
    answer: null,
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
            time: state.time + 1,
            data: [...state.data, action.answer]
        })
    }

    else if (action.type === SCORE_RIGHT) {
        return Object.assign({}, state, {
            score: state.score + 1,
            time: state.time + 1
        })
    }

    else if (action.type === SUBMIT_WRONG_ANSWER) {
        return Object.assign({}, state, {
            answer: action.answer,
            time: state.time + 1
           
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
    else if (action.type === FETCH_COUNT_SUCCESS) {
        return Object.assign({}, state, {
            count: action.count,
            score: action.score,
            time: action.time,
            loading: false,
            error: null
        });
    }
    else if (action.type === FETCH_COUNT_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    }
    return state;
}
