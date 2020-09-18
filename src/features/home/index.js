import React, { Fragment, useCallback, memo, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import {
    loadUsers,
    deleteUser,
    deleteUserClicked
} from './slice';
import {
    logout
} from '../signin/slice';
import { Link, Redirect } from 'react-router-dom';

const SignIn = memo((props) => {
    const { users, errors, loading, idToken } = props;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadUsers());
    }, [dispatch])
    if (!idToken) {
        return <Redirect to="/signin/" />
    }
    return (
        <Fragment>
            <div id="wrapper">

                <div id="content-wrapper" className="d-flex flex-column">


                    <div id="content">
                        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                            <form className="form-inline">
                                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                                    <i className="fa fa-bars"></i>
                                </button>
                            </form>

                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item dropdown no-arrow d-sm-none">
                                    <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-search fa-fw"></i>
                                    </a>

                                    <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                                        <form className="form-inline mr-auto w-100 navbar-search">
                                            <div className="input-group">
                                                <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                                                <div className="input-group-append">
                                                    <button className="btn btn-primary" type="button">
                                                        <i className="fas fa-search fa-sm"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </li>
                                <div className="topbar-divider d-none d-sm-block"></div>
                                <li className="nav-item dropdown no-arrow">
                                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={() => dispatch(logout())}>
                                        <span className="mr-2 d-lg-inline text-gray-600 small">Logout</span>
                                    </a>
                                </li>
                            </ul>

                        </nav>

                        <div className="container-fluid">
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary">Users List</h6>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Salary</th>
                                                </tr>
                                            </thead>
                                            
                                            <tbody>
                                                {users.length > 0 ? users.map(user => (
                                                    <tr>
                                                        <td>{user.username}</td>
                                                        <td>{user.email}</td>
                                                        <td className="cursorPointer" onClick={() => dispatch(deleteUserClicked(user.id))}>Delete</td>
                                                    </tr>
                                                )) : <tr>
                                                        <td colSpan="6">No Users List</td>
                                                    </tr>}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <footer className="sticky-footer bg-white">
                        <div className="container my-auto">
                            <div className="copyright text-center my-auto">
                                <span>Copyright &copy; Your Website 2020</span>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </Fragment>
    )
})

export default connect(state => ({
    idToken: state.signin.idToken,
    ...state.home,
}))(SignIn);