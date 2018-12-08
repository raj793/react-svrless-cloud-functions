import {formReducerConstants} from '../constants/formReducerConstants'

let initialState = {
    ip: '',
    values: {},
    isLoading: false,
    response: '',
    showNotification: false
}

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case formReducerConstants.reset: {
            const stateObj = {...initialState}
            return stateObj
        }
        case formReducerConstants.setIp: {
            const stateObj = {...state}
            stateObj.ip = action.ip
            return stateObj
        }
        case formReducerConstants.setFormValues: {
            const stateObj = {...state}
            stateObj.values = Object.assign(action.values)
            return stateObj
        }
        case formReducerConstants.sendingApiRequest: {
            const stateObj = {...state}
            stateObj.isLoading = true
            return stateObj
        }
        case formReducerConstants.successResponse: {
            const stateObj = {...state}
            stateObj.isLoading = false
            stateObj.response = action.response
            stateObj.showNotification = true
            return stateObj
        }
        case formReducerConstants.failureResponse: {
            const stateObj = {...state}
            stateObj.isLoading = false
            stateObj.response = action.response
            stateObj.showNotification = true
            return stateObj
        }
        case formReducerConstants.hideNotification: {
            const stateObj = {...state}
            stateObj.showNotification = false
            return stateObj
        }
        default: return state
    }
}