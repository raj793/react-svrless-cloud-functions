import axios from 'axios'
import {formSubmitBaseUrl} from '../constants/config'

export default class FormApi {
    constructor() {
      this.instance = axios.create({
        baseURL: `${formSubmitBaseUrl}`,
        timeout: 10000
      });
    }
  
    formSubmitPostMethod = (ip, ua, fn, ln, email, token) => {
      const url = `/formSubmit`

      const data = {
        firstName: fn,
        lastName: ln,
        ip: ip,
        userAgent: ua,
        email: email,
        token: token
    }

      return this.instance.post(url,data)
    }
  }