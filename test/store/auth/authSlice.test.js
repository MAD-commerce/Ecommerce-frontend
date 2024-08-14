const { authSlice, onLogin } = require('../../../src/store/auth/authSlice');

describe('Pruebas en authSlice', () => {
    
    const testUserCredentials = {
        name: 'test',
        email: 'test@gmail.com',
        password: '123456',
        uid: '63c19e196b2b8568445187e0',
    }
    
    const initialState = {
        status: 'checking',
        user: {},
        errorMessage: undefined,
    }

    test('debe de realizar un login', () => {
        
        const state = authSlice.reducer( initialState, onLogin( testUserCredentials ) );
        expect( state ).toEqual({
            status: 'authenticated',
            user: testUserCredentials,
            errorMessage: undefined
        })
    });
});