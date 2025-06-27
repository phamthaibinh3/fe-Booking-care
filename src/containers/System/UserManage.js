import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUser, createNewUserService, deleteUserService, editeUsersService } from '../../services/userService'
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUser: [],
            isOpenModalUser: false,
            isOpenModalEditlUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async () => {
        let res = await getAllUser('ALL');
        if (res && res.errCode === 0) {
            this.setState({
                arrUser: res.users
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true
        })
    }

    toogleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }

    toogleUserEditModal = () => {
        this.setState({
            isOpenModalEditlUser: !this.state.isOpenModalEditlUser
        })
    }

    createNewUser = async (data) => {
        let res = await createNewUserService(data);
        if (res && res.errCode !== 0) {
            alert(res.errMessage)
        } else {
            this.getAllUsersFromReact();
            this.setState({
                isOpenModalUser: false
            })
        }
    }

    handleDeleteUser = async (item) => {
        let res = await deleteUserService(item.id)
        if (res && res.errCode === 0) {
            this.getAllUsersFromReact();
        } else {
            alert(res.errMessage)
        }
    }

    handleEditUser = (user) => {
        this.setState({
            isOpenModalEditlUser: true,
            userEdit: user
        })
    }

    doEditUser = async (user) => {
        let res = await editeUsersService(user);
        if (res && res.errCode === 0) {
            await this.getAllUsersFromReact();
            this.setState({
                isOpenModalEditlUser: false
            })
        } else {
            alert(res.errMessage);
        }
    }

    render() {
        let users = this.state.arrUser;
        return (
            <div className="user-container">
                <div className='title text-center'>Manage users with ThaiBinh</div>
                <div
                    onClick={() => this.handleAddNewUser()}
                    className='btn btn-primary mx-3 px-3'>
                    <i className="fas fa-plus"></i>
                    Add new user
                </div>
                <ModalUser
                    isOpenModalUser={this.state.isOpenModalUser}
                    toogleUserModal={this.toogleUserModal}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenModalEditlUser &&
                    <ModalEditUser
                        isOpenModalEditUser={this.state.isOpenModalEditlUser}
                        toogleUserEditModal={this.toogleUserEditModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }
                <div className='user-table mx-1 mt-4'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Address</th>
                                <th>Action </th>
                            </tr>
                            {users && users.length && users.map((item, index) => {
                                return (
                                    <tr index={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td className='btn-action'>
                                            <button onClick={() => this.handleEditUser(item)} className='btn-edit'><i className="fas fa-pencil-alt"></i></button>
                                            <button onClick={() => this.handleDeleteUser(item)} className='btn-delete'><i className="fas fa-trash" ></i></button>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
