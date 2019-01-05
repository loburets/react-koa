export const loginUser = user => ({
    type: 'LOGIN_USER',
    id: user.id,
    email: user.email,
    firstName: user.first_name,
    lastName: user.last_name,
});

export const logout = () => ({
    type: 'LOGOUT',
});
