const initialState = {
    token: '',
    refreshToken: ''
};

function rootReducer(state = initialState, action) {
    if (action.type === 'LOGIN') {
        state.token = action.data.token
        state.refreshToken = action.data.refreshToken
    }

    return state;
}

export default rootReducer;