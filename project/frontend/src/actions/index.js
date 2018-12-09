export const loginUser = user => ({
    type: 'LOGIN_USER',
    id: user.id,
    email: user.email,
});
