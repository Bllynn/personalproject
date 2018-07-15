const initialState={
    user:{},
    appointment:{}
}
const USER_DATA='USER_DATA';
const APPOINTMENT_DATA='APPOINTMENT_DATA'

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
        case APPOINTMENT_DATA:
            return Object.assign({}, state, {appointment:action.payload})
        case USER_DATA:
            return Object.assign({}, state,{user:action.payload});
        default:
            return state;
    }
}
//export action creators without defualt...import as {import} from '../filepath'