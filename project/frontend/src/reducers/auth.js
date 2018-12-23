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
        default:
            return state;
    }
};

export default auth