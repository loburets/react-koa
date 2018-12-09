const auth = (state = [], action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return {
                ...state,
                id: action.id,
                email: action.email,
            };
        default:
            return state;
    }
};

export default auth