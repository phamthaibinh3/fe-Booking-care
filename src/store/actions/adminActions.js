import actionTypes from './actionTypes';
import {
    getAllCodeService, createNewUserService, getAllUser, deleteUserService,
    editeUsersService, getTopDocterHomeService, getAllDoctors,
    saveDetailDoctorService,getAllSpecialty,getAllClinic
} from '../../services/userService';
import { toast } from 'react-toastify';

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService("GENDER")
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            fetchGenderFailed();
            console.log(e);
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION")
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            fetchGenderFailed();
            console.log(e);
        }
    }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE")
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            fetchGenderFailed();
            console.log(e);
        }
    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        let res = await createNewUserService(data);
        if (res && res.errCode === 0) {
            dispatch(saveUserSuccess())
            toast.success("Create a new user succeed!");
            dispatch(fetchAllUsers())
        } else {
            dispatch(saveUserFailded())
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailded = () => ({
    type: actionTypes.CREATE_USER_FAILDED
})

export const fetchAllUsers = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUser("ALL")
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()))
            } else {
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            fetchAllUsersFailed();
            console.log(e);
        }
    }
}

export const fetchAllUsersSuccess = (allUsers) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    data: allUsers
})

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})

export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId)
            if (res && res.errCode === 0) {
                dispatch(deleteUserSuccess())
                toast.success("Delete the user succeed!");
                dispatch(fetchAllUsers())
            } else {
                toast.error("Delete the user failed!");
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            toast.error("Delete the user failed!");
            deleteUserFailed();
            console.log(e);
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editeUsersService(data);
            if (res && res.errCode === 0) {
                dispatch(editUserSuccess())
                toast.success("Update the user succeed!");
                dispatch(fetchAllUsers())
            } else {
                dispatch(editUserFailed())
                toast.error("Update the user failed!");
            }
        } catch (e) {
            editUserFailed();
            toast.error("Update the user failed!");
            console.log(e);
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})


export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDocterHomeService('');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
                })
                toast.error("Update the user failed!");
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
            })
            // toast.error("Update the user failed!");
            console.log('check loi: ', e);
        }
    }
}

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDr: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
            })
            console.log(e);
        }
    }
}

export const saveDetailDoctor = (dataInput) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(dataInput);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.SAVE_INFOR_DOCTOR_SUCCESS
                })
                toast.success('Save infor doctor succeed!');
            } else {
                dispatch({
                    type: actionTypes.SAVE_INFOR_DOCTOR_FAILED
                })
                toast.error('Save infor doctor failed!');
            }

        } catch (e) {
            dispatch({
                type: actionTypes.SAVE_INFOR_DOCTOR_FAILED,
            })
            toast.error('loi tu server!');
            console.log(e);
        }
    }
}

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
            })
            console.log(e);
        }
    }
}

export const fetchRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS
            })
            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            let resSpecialty = await getAllSpecialty();
            let resClinic = await getAllClinic();

            if (resPrice && resPrice.errCode === 0 &&
                resPayment && resPayment.errCode === 0 &&
                resProvince && resProvince.errCode === 0 &&
                resSpecialty && resSpecialty.errCode === 0 &&
                resClinic && resClinic.errCode === 0
            ) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data
                }
                dispatch({
                    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
                    data: data
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,
                });
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,
            });
            console.log(e);
        }
    }
}