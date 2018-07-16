const initialState={
    user:{},
    appointment:[]
}
const USER_DATA='USER_DATA';
const APPOINTMENT_DATA='APPOINTMENT_DATA'
const DELETE_APT='DELETE_APT'
const CREATE_WORKOUT='CREATE_WORKOUT'

export function createAppointment(newApt){
    console.log(newApt)
    return{
        type:CREATE_WORKOUT,
        payload:newApt
    }
}
export function deleteAppointment(newApt){
    console.log(newApt)
    return{
        type:DELETE_APT,
        payload: newApt
    }
}
export function getAppointmentData(apt){
    console.log(apt)
    return{
        type:APPOINTMENT_DATA,
        payload: apt
    }
}

export function getUserData(user){
    console.log(user)
    return{
        type:USER_DATA,
        payload:user
    }
}



export default function reducer(state=initialState,action){
    switch(action.type){
        case CREATE_WORKOUT:
            return Object.assign({}, state,{appointment:action.payload})
        case DELETE_APT:
            return Object.assign({}, state,{appointment:action.payload})
        case APPOINTMENT_DATA:
            return Object.assign({}, state, {appointment:action.payload})
        case USER_DATA:
            return Object.assign({}, state,{user:action.payload});
        default:
            return state;
    }
}
//export action creators without defualt...import as {import} from '../filepath'