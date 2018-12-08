import {onFailureDispatch, onSuccessDispatch, sendApiRequestDispatch, setFormValuesDispatch, hideNotificationDispatch} from '../action-creators/formActionCreators'
import FormApi from '../api/FormApi'

export function setFormValues (obj) {
    return function(dispatch) {
        dispatch(setFormValuesDispatch(obj))
    }
}

export function sendForm(ip, ua, fn, ln, email, token) {
    return function(dispatch) {
        dispatch(sendApiRequestDispatch())
        const apiObj = new FormApi()
        apiObj.formSubmitPostMethod(ip, ua, fn, ln, email, token).then((response) => {
            dispatch(onSuccessDispatch(response.data))
        })
        .catch((err) => {
            dispatch(onFailureDispatch(err.response.data))
        })
    }
}

export function hideNotification() {
    return function(dispatch) {
        dispatch(hideNotificationDispatch())
    }
}