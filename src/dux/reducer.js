const initialState={
    user:{},
    appointment:[]
}
const EDIT_APT='EDIT_APT'
const USER_DATA='USER_DATA';
const APPOINTMENT_DATA='APPOINTMENT_DATA'
const DELETE_APT='DELETE_APT'
const CREATE_APPOINTMENT='CREATE_APPOINTMENT'

export function editAppointment(newApt){
    return{
        type:EDIT_APT,
        payload:newApt
    }
}
export function createAppointment(newApt){
    console.log(newApt)
    return{
        type:CREATE_APPOINTMENT,
        payload:newApt
    }
}
export function deleteAppointment(newApt){
    
    return{
        type:DELETE_APT,
        payload: newApt
    }
}
export function getAppointmentData(apt){
    
    return{
        type:APPOINTMENT_DATA,
        payload: apt
    }
}

export function getUserData(user){
    
    return{
        type:USER_DATA,
        payload:user
    }
}



export default function reducer(state=initialState,action){
    switch(action.type){
        case EDIT_APT:
            return Object.assign({}, state,{appointment:action.payload})
        case CREATE_APPOINTMENT:
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