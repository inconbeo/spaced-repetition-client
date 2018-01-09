import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_PROTECTED_DATA_SUCCESS = 'FETCH_PROTECTED_DATA_SUCCESS';
export const fetchProtectedDataSuccess = data => ({
    type: FETCH_PROTECTED_DATA_SUCCESS,
    data
});

export const FETCH_PROTECTED_DATA_ERROR = 'FETCH_PROTECTED_DATA_ERROR';
export const fetchProtectedDataError = error => ({
    type: FETCH_PROTECTED_DATA_ERROR,
    error
});

export const SUBMIT_CORRECT_ANSWER = 'SUBMIT_CORRECT_ANSWER';
export const submitCorrectAnswer = answer => ({
    type: SUBMIT_CORRECT_ANSWER,
    answer
})

export const SUBMIT_WRONG_ANSWER = 'SUBMIT_WRONG_ANSWER';
export const submitWrongAnswer = answer => ({
    type: SUBMIT_WRONG_ANSWER,
    answer
})

export const RESET_QUESTIONS = 'RESET_QUESTIONS';
export const resetQuestions = (answer)  => ({
    type: RESET_QUESTIONS,
    answer
})

export const START_OVER = 'START_OVER';
export const startOver = ()  => ({
    type: START_OVER,
})

export const fetchProtectedData = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/protected`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((data) => {
            console.log(data)
            dispatch(fetchProtectedDataSuccess(data.questions))})
        .catch(err => {
            dispatch(fetchProtectedDataError(err));
        });
};

