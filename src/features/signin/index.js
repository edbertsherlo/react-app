import React, { Fragment, useCallback, memo } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import {
    fieldValueUpdated,
    submitButtonClicked
} from './slice';

const SignIn = memo((props) => {
    const { form, errors, loading, idToken } = props;
    const dispatch = useDispatch();
    if (idToken) {
        return <Redirect to="/" />
    }
    return (
        <Fragment>
            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-xl-10 col-lg-12 col-md-9">

                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-3">
                                    </div>
                                    <div className="col-lg-6 col-md-12">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                            </div>

                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className={["form-control form-control-user", (errors.find(r => r === "username_error") ? "error-field" : "")].join(" ")}
                                                    id="exampleInputEmail"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Enter Email Address..."
                                                    value={form.username}
                                                    onChange={useCallback((e) => dispatch(fieldValueUpdated({ field: "username", value: e.target.value })), [dispatch])}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="password"
                                                    className={["form-control form-control-user", (errors.find(r => r === "password_error") ? "error-field" : "")].join(" ")}
                                                    id="exampleInputPassword"
                                                    placeholder="Password"
                                                    value={form.password}
                                                    onChange={useCallback((e) => dispatch(fieldValueUpdated({ field: "password", value: e.target.value })), [dispatch])}
                                                />
                                            </div>

                                            <button
                                                as="a"
                                                className="btn btn-primary btn-user btn-block"
                                                disabled={loading}
                                                onClick={useCallback(() => dispatch(submitButtonClicked()), [dispatch])}
                                            >
                                                {loading ? "Please Wait.." : "Login"}
                                            </button>
                                            <div className="text-center">
                                                <Link className="small" to="/signup/">Create an Account!</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
})

export default connect(state => ({
    ...state.signin
}))(SignIn);