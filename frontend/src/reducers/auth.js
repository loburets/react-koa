const auth = (state = [], action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return {
                ...state,
                id: action.id,
                email: action.email,
                firstName: action.firstName,
                lastName: action.lastName,
            };
        case 'LOGOUT':
            console.log('LOGOUT')
            let newState = Object.assign({}, state);
            delete newState.id;
            delete newState.email;
            delete newState.firstName;
            delete newState.lastName;

            return newState;
        default:
            return state;
    }
};

export default auth