import {formReducerConstants} from '../constants/formReducerConstants'

export function setFormValuesDispatch(obj) {
    return {
        type: formReducerConstants.setFormValues,
        values: obj
    }
}

export function sendApiRequestDispatch() {
    return {
        type: formReducerConstants.sendingApiRequest
    }
}

export function onSuccessDispatch(response) {
    return {
        type: formReducerConstants.successResponse,
        response: response
    }
}

export function onFailureDispatch(response) {
    return {
        type: formReducerConstants.failureResponse,
        response: response
    }
}

export function hideNotificationDispatch() {
    return {
        type: formReducerConstants.hideNotification
    }
}