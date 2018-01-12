import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';
import { fetchItemSuccess } from './auth';

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


export const START_OVER = 'START_OVER';
export const startOver = ()  => ({
    type: START_OVER,
})

export const FETCH_COUNT_SUCCESS = 'FETCH_COUNT_SUCCESS';
export const fetchCountSuccess = (count, score, time) => ({
    type: FETCH_COUNT_SUCCESS,
    count,
    score,
    time
});

export const FETCH_COUNT_ERROR = 'FETCH_PROTECTED_DATA_ERROR';
export const fetchCountError = error => ({
    type: FETCH_COUNT_ERROR,
    error
});

export const SCORE_RIGHT = 'SCORE_RIGHT';
export const scoreRight = () => ({
    type: FETCH_COUNT_ERROR
    
});

export const RESET = 'RESET';
export const reset = () => ({
    type: RESET
    
});

export const postingAnswer = (value) => (dispatch, getState) => {
    console.log('START POSTING ANSWER')
    const state = getState();
    return fetch(`${API_BASE_URL}/users/answer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${state.auth.authToken}`
      },
      body: JSON.stringify({answer: value, username: state.auth.currentUser.username})
    })
    // .then((data) => {
    //     console.log('DATA DAY NE', data)
    //     dispatch(fetchingQuestion())
    //     })
  };

export const fetchingQuestion = () => (dispatch, getState) => {
    console.log('START FETCHING QUESTIONS')
    const authToken = getState().auth.authToken;
    const state = getState();
    return fetch(`${API_BASE_URL}/users/node/${state.auth.currentUser.id}`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((data) => {
            console.log('FETCHING QUESTION DATA NE',data)
            dispatch(fetchItemSuccess(data))
        })
};

export const transferQuestions = () => (dispatch, getState) => {
    console.log('TRANSFER QUESTIONS START HERE')
    const authToken = getState().auth.authToken;
    const state = getState();
    return fetch(`${API_BASE_URL}/users/questions/${state.auth.currentUser.id}`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
}

export const updateCount = (count, score, time) => (dispatch, getState) => {
    console.log('UPDATING COUNTS ARE DISPATCHING HERE');
    console.log(count, score, time);
    const state = getState();
    return fetch(`${API_BASE_URL}/users/count/${state.auth.currentUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${state.auth.authToken}`
      },
      body: JSON.stringify({ count: count, score: score, time: time })
    })
  };

  export const fetchCount = () => (dispatch, getState) => {
      console.log('FETCHING COUNTS HERE')
    const authToken = getState().auth.authToken;
    const state = getState();
    return fetch(`${API_BASE_URL}/users/count/${state.auth.currentUser.id}`, {
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
            dispatch(fetchCountSuccess(data.count, data.score, data.time))})
        .catch(err => {
            dispatch(fetchCountError(err));
        });
};

export const fetchAddItem = item => (dispatch, getState) => {
    const state = getState();
    return fetch(`${API_BASE_URL}/users/${state.auth.currentUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${state.auth.authToken}`
      },
      body: JSON.stringify({ questions: item })
    })
  };

  export const fetchAddList = () => (dispatch, getState) => {
      console.log('FETCHADDLIST ARE DISPATCHING HERE')
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
            dispatch(fetchAddItem(data[0].questions))})
    };