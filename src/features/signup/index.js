import React, { Fragment, useCallback, memo } from 'react';
import { useDispatch, connect } from 'react-redux';
import {
    fieldValueUpdated,
    submitButtonClicked
} from './slice';
import { Link, Redirect } from 'react-router-dom';

const SignIn = memo((props) => {
    const { form, errors, loading, idToken } = props;
    const dispatch = useDispatch();
    if (idToken) {
        return <Redirect to="/" />
    }
    return (
        <Fragment>
            <div className="container">

                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        <div className="row">
                            <div className="col-lg-2"></div>
                            <div className="col-lg-8">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input
                                                type="text"
                                                className={["form-control form-control-user", (errors.find(r => r === "first_name_error") ? "error-field" : "")].join(" ")}
                                                id="exampleFirstName"
                                                placeholder="First Name"
                                                value={form.first_name}
                                                onChange={useCallback((e) => dispatch(fieldValueUpdated({ field: "first_name", value: e.target.value })), [dispatch])}
                                            />
                                        </div>
                                        <div className="col-sm-6">
                                            <input
                                                type="text"
                                                className={["form-control form-control-user", (errors.find(r => r === "last_name_error") ? "error-field" : "")].join(" ")}
                                                id="exampleLastName"
                                                placeholder="Last Name"
                                                value={form.last_name}
                                                onChange={useCallback((e) => dispatch(fieldValueUpdated({ field: "last_name", value: e.target.value })), [dispatch])}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            className={["form-control form-control-user", (errors.find(r => r === "email_error") ? "error-field" : "")].join(" ")}
                                            id="exampleInputEmail"
                                            placeholder="Email Address"
                                            value={form.email}
                                            onChange={useCallback((e) => dispatch(fieldValueUpdated({ field: "email", value: e.target.value })), [dispatch])}
                                        />
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input
                                                type="password"
                                                className={["form-control form-control-user", (errors.find(r => r === "password_error") ? "error-field" : "")].join(" ")}
                                                id="exampleInputPassword"
                                                placeholder="Password"
                                                value={form.password}
                                                onChange={useCallback((e) => dispatch(fieldValueUpdated({ field: "password", value: e.target.value })), [dispatch])}
                                            />
                                        </div>
                                        <div className="col-sm-6">
                                            <input
                                                type="password"
                                                className={["form-control form-control-user", (errors.find(r => r === "confirm_password_error") ? "error-field" : "")].join(" ")}
                                                id="exampleRepeatPassword"
                                                placeholder="Repeat Password"
                                                value={form.confirm_password}
                                                onChange={useCallback((e) => dispatch(fieldValueUpdated({ field: "confirm_password", value: e.target.value })), [dispatch])}
                                            />
                                        </div>
                                    </div>
                                    <button
                                        as="a"
                                        className="btn btn-primary btn-user btn-block"
                                        disabled={loading}
                                        onClick={useCallback(() => dispatch(submitButtonClicked()), [dispatch])}
                                    >
                                        {loading ? "Please Wait.." : "Register Account"}
                                    </button>
                                    <hr />
                                    <div className="text-center">
                                        <Link className="small" to="/signin/">Already have an account? Login!</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-2"></div>
                        </div>
                    </div>
                </div>

            </div>
        </Fragment>
    )
})

export default connect(state => ({
    idToken: state.signin.idToken,
    ...state.signup,
}))(SignIn);