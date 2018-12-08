import IpApi from '../api/IpApi'
import {setIpAddressDispatch} from '../action-creators/ipAddressActionCreators'

export function fetchIpAddress() {
    return function(dispatch) {
        const apiObj = new IpApi()
        apiObj.fetchUsersIpAddress().then((response) => {
            dispatch(setIpAddressDispatch(response.data))
        })
        .catch((err) => {
            console.log("Error fetching IP Address: ", err)
        })
    }
}