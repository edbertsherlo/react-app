import { createSlice } from '@reduxjs/toolkit';
import * as homeAPI from "./api";
import { submitSigninFailed } from "../signin/slice";

export const homeSlice = createSlice({
    name: 'home',
    initialState: {
        users: [],
        errors: [],
        loading: false,
    },
    reducers: {
        getUsers: (state) => {
            state.loading = true;
        },
        getUsersSuccess: (state, { payload }) => {
            state.loading = false;
            state.users = payload;
        },
        getUsersFailed: (state) => {
            state.loading = false;
        },
        deleteUser: (state) => {
            state.loading = true;
        },
        deleteUserSuccess: (state, { payload }) => {
            console.log(payload);
            state.loading = false;
            state.users = [...state.users.filter(r => parseInt(r.id) !== parseInt(payload))];
        },
        deleteUserFailed: (state) => {
            state.loading = false;
        }
    },
});

homeSlice.actions.loadUsers = () => async (dispatch) => {
    dispatch(getUsers())
    const response = await homeAPI.getUsers();
    if (response && response.status) {
        dispatch(getUsersSuccess(response.data));
    } else {
        dispatch(getUsersFailed());
        localStorage.removeItem("idToken")
        const errors = (response && response.data && Object.keys(response.data)) || [];
        dispatch(submitSigninFailed(errors));
    }
};

homeSlice.actions.deleteUserClicked = (id) => async (dispatch) => {
    dispatch(getUsers())
    const response = await homeAPI.deleteUser(id);
    if (response && response.status) {
        dispatch(deleteUserSuccess(id));
    } else {
        dispatch(deleteUserFailed());
        localStorage.removeItem("idToken")
        const errors = (response && response.data && Object.keys(response.data)) || [];
        dispatch(submitSigninFailed(errors));
    }
};

export const { getUsers, getUsersSuccess, getUsersFailed, deleteUser, deleteUserSuccess, deleteUserFailed, loadUsers, deleteUserClicked } = homeSlice.actions;

export default homeSlice.reducer;
