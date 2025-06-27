import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class ModalUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }

    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toogleUserModal();
    }

    handleOnchangeInput = (event, id) => {
        let copyState = { ... this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++){
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert('Missing parameter' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleAddNewUser = () => {
        let isValid = this.checkValidateInput();
        if(isValid === true){
            this.props.createNewUser(this.state);
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
            })
        }
        // console.log('check state: ',this.state);
    }

    render() {
        return (
            <div className="text-center" >
                <Modal
                    size='lg'
                    isOpen={this.props.isOpenModalUser}
                    toggle={() => { this.toggle() }}
                    className={'modal-user-container'}>
                    <ModalHeader toggle={() => { this.toggle() }}>Modal title</ModalHeader>
                    <ModalBody>
                        <div className='modal-user-body'>
                            <div className='input-container'>
                                <label>Email</label>
                                <input
                                    type='text'
                                    onChange={(event) => this.handleOnchangeInput(event, 'email')}
                                    value={this.state.email}
                                />
                            </div>
                            <div className='input-container'>
                                <label>password</label>
                                <input
                                    onChange={(event) => this.handleOnchangeInput(event, 'password')}
                                    type='password'
                                    value={this.state.password}
                                />
                            </div>
                            <div className='input-container'>
                                <label>First name</label>
                                <input
                                    onChange={(event) => this.handleOnchangeInput(event, 'firstName')}
                                    type='text'
                                    value={this.state.firstName}
                                />
                            </div>
                            <div className='input-container'>
                                <label>Last name</label>
                                <input
                                    onChange={(event) => this.handleOnchangeInput(event, 'lastName')}
                                    type='text'
                                    value={this.state.lastName}
                                />
                            </div>
                            <div className='input-container max-width-input'>
                                <label>Address</label>
                                <input
                                    onChange={(event) => this.handleOnchangeInput(event, 'address')}
                                    type='text'
                                    value={this.state.address}
                                />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button 
                        color="primary" 
                        className='px-3' 
                        onClick={() => { this.handleAddNewUser() }}>
                            Add new
                        </Button>{' '}
                        <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
