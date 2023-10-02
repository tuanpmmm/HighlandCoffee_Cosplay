import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: '',
        name: '',
        email: '',
        is_admin: false,
        is_login: false,
    },
    reducers: {
        updateUser: (state, action) => {
            const { id, fullname, email, is_admin, is_login } = action.payload;
            state.id = id;
            state.name = fullname;
            state.email = email;
            state.is_admin = is_admin;
            state.is_login = is_login;
        },
        resetUser: (state) => {
            state.id = '';
            state.name = '';
            state.email = '';
            state.is_admin = false;
            state.is_login = false;
        }
    }
})

export default userSlice;