import { createSlice } from '@reduxjs/toolkit';
import * as singupAPI from "./api";
import { submitSigninSuccess, submitSigninFailed } from "../signin/slice";

export const signupSlice = createSlice({
    name: 'signup',
    initialState: {
        form: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirm_password: "",
        },
        errors: [],
        loading: false,
    },
    reducers: {
        fieldValueUpdated: (state, { payload }) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            if(payload.field === 'email') {
                state.form.username = payload.value;
            }
            state.form[payload.field] = payload.value;
        },
        submitSignup: (state) => {
            state.loading = true;
        },
        submitSignupSuccess: (state) => {
            state.loading = false;
        },
        submitSignupFailed: (state, { payload }) => {
            state.loading = false;
            state.errors = payload;
        },
    },
});

signupSlice.actions.submitButtonClicked = () => async (dispatch, getState) => {
    dispatch(submitSignup())
    const form = getState().signup.form;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const errors = []
    if (!(form.username && re.test(form.username))) {
        errors.push("email_error")
    }
    if (!form.first_name) {
        errors.push("first_name_error")
    }
    if (!form.last_name) {
        errors.push("last_name_error")
    }
    if (!form.password) {
        errors.push("password_error")
    }
    if (!form.confirm_password || form.password !== form.confirm_password) {
        errors.push("confirm_password_error")
    }
    if (errors.length > 0) {
        dispatch(submitSignupFailed(errors));
    } else {
        const response = await singupAPI.signupForm(form);
        if (response && response.status) {
            localStorage.setItem("idToken", response.idToken)
            dispatch(submitSigninSuccess(response.idToken));
            dispatch(submitSignupSuccess());
        } else {
            localStorage.removeItem("idToken")
            const errors = (response && response.data && Object.keys(response.data)) || [];
            dispatch(submitSigninFailed(errors));
            dispatch(submitSignupFailed(errors));
        }
    }
};

export const { fieldValueUpdated, submitSignup, submitSignupSuccess, submitSignupFailed, submitButtonClicked } = signupSlice.actions;

export default signupSlice.reducer;
