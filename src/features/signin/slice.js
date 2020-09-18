import { createSlice } from '@reduxjs/toolkit';
import * as singinAPI from "./api";

const idToken = localStorage.getItem("idToken") || null;

export const signinSlice = createSlice({
    name: 'signin',
    initialState: {
        form: {
            username: "",
            password: ""
        },
        errors: [],
        loading: false,
        idToken: idToken,
    },
    reducers: {
        fieldValueUpdated: (state, { payload }) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.form[payload.field] = payload.value;
        },
        submitSignin: (state) => {
            state.loading = true;
        },
        submitSigninSuccess: (state, { payload }) => {
            state.loading = false;
            state.idToken = payload;
        },
        submitSigninFailed: (state, { payload }) => {
            state.idToken = null;
            state.loading = false;
            state.errors = payload;
        },
        logout: (state) => {
            localStorage.removeItem("idToken");
            state.idToken = null;
        }
    },
});

signinSlice.actions.submitButtonClicked = () => async (dispatch, getState) => {
    dispatch(submitSignin())
    const form = getState().signin.form;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const errors = []
    if (!(form.username)) {
        errors.push("username_error")
    }
    if (!form.password) {
        errors.push("password_error")
    }
    if (errors.length > 0) {
        dispatch(submitSigninFailed(errors));
    } else {
        const response = await singinAPI.signinForm(form);
        if (response && response.status) {
            localStorage.setItem("idToken", response.idToken)
            dispatch(submitSigninSuccess(response.idToken));
        } else {
            localStorage.removeItem("idToken")
            const errors = (response && response.data.errors && Object.keys(response.data.errors)) || [];
            dispatch(submitSigninFailed(errors));
        }
    }
};

export const { fieldValueUpdated, submitSignin, submitSigninSuccess, submitSigninFailed, submitButtonClicked, logout } = signinSlice.actions;

export default signinSlice.reducer;
