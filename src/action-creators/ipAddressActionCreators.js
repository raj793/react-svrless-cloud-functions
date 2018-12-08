import {formReducerConstants} from '../constants/formReducerConstants'

export function setIpAddressDispatch(ip) {
    return {
        type: formReducerConstants.setIp,
        ip: ip
    }
}