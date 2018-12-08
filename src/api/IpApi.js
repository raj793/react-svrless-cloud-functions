import axios from 'axios'
import {ipAddressBaseUrl} from '../constants/config'

export default class IpApi {
    constructor() {
      this.instance = axios.create({
        baseURL: `${ipAddressBaseUrl}`,
        timeout: 10000
      });
    }
  
    fetchUsersIpAddress = () => {
      const url = ``
      return this.instance.get(url)
    }
  }